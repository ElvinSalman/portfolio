const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const React = require("react");
const { create, act } = require("react-test-renderer");
const { transformSync } = require("next/dist/build/swc");
function component(send) {
  const source = fs.readFileSync("components/Contact.js", "utf8");
  const { code } = transformSync(source, {
    filename: "Contact.js",
    jsc: {
      parser: { syntax: "ecmascript", jsx: true },
      transform: { react: { runtime: "automatic" } },
    },
    module: { type: "commonjs" },
  });
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require(name) {
      if (name === "@emailjs/browser") return { send };
      if (name === "next-i18next")
        return { useTranslation: () => ({ t: (key) => key }) };
      if (name === "@constants/data")
        return {
          phone: "+994 55 979 98 71",
          email: "test@example.com",
          socialLinks: {},
        };
      return require(name);
    },
  });
  return exports.default;
}
function setup(send) {
  let view;
  act(() => {
    view = create(React.createElement(component(send)));
  });
  return view;
}
function fill(view, values) {
  for (const [name, value] of Object.entries(values))
    act(() =>
      view.root.findByProps({ id: name }).props.onChange({ target: { name, value } }),
    );
}
const valid = {
  name: " Test User ",
  email: " test@example.com ",
  message: " Hello portfolio ",
};
const event = { preventDefault() {} };
test("rejects whitespace-only and malformed email without sending", async () => {
  let count = 0;
  const view = setup(() => {
    count++;
  });
  fill(view, { ...valid, name: "   " });
  await act(() => view.root.findByType("form").props.onSubmit(event));
  assert.equal(
    view.root.findByProps({ role: "status" }).children[0],
    "formRequired",
  );
  fill(view, { ...valid, email: "invalid" });
  await act(() => view.root.findByType("form").props.onSubmit(event));
  assert.equal(
    view.root.findByProps({ role: "status" }).children[0],
    "formInvalidEmail",
  );
  assert.equal(count, 0);
  view.unmount();
});
test("preserves EmailJS configuration, trims values, blocks duplicates, and resets after success", async () => {
  let resolve,
    calls = [];
  const view = setup((...args) => {
    calls.push(args);
    return new Promise((r) => (resolve = r));
  });
  fill(view, valid);
  let pending;
  act(() => {
    pending = view.root.findByType("form").props.onSubmit(event);
  });
  assert.equal(view.root.findByType("button").props.disabled, true);
  await act(() => view.root.findByType("form").props.onSubmit(event));
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0])), [
    "service_50wgfvj",
    "template_zhoexop",
    {
      name: "Test User",
      email: "test@example.com",
      message: "Hello portfolio",
    },
    { publicKey: "-Hccfm_2DUuYXUEoN" },
  ]);
  await act(async () => {
    resolve();
    await pending;
  });
  assert.equal(view.root.findByProps({ id: "name" }).props.value, "");
  assert.equal(
    view.root.findByProps({ role: "status" }).children[0],
    "formSuccess",
  );
  view.unmount();
});
test("keeps the message after failure and allows retry", async () => {
  let fail = true;
  const view = setup(() =>
    fail ? Promise.reject(new Error("offline")) : Promise.resolve(),
  );
  fill(view, valid);
  await act(() => view.root.findByType("form").props.onSubmit(event));
  assert.equal(
    view.root.findByProps({ role: "status" }).children[0],
    "formError",
  );
  assert.equal(
    view.root.findByProps({ id: "message" }).props.value,
    valid.message,
  );
  assert.equal(view.root.findByType("button").props.disabled, false);
  fail = false;
  await act(() => view.root.findByType("form").props.onSubmit(event));
  assert.equal(
    view.root.findByProps({ role: "status" }).children[0],
    "formSuccess",
  );
  view.unmount();
});
test("all locales have the same translation keys and translated form feedback", () => {
  const locales = ["en", "ru", "az"].map((lang) =>
    JSON.parse(
      fs.readFileSync("public/locales/" + lang + "/common.json", "utf8"),
    ),
  );
  for (const locale of locales) {
    assert.deepEqual(
      Object.keys(locale).sort(),
      Object.keys(locales[0]).sort(),
    );
    for (const key of [
      "formSuccess",
      "formError",
      "formSending",
      "formRequired",
    ])
      assert.ok(locale[key]);
  }
});
