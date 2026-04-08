import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/button";

test("Button renders child element instead of nested button when asChild is true", () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Button,
      { asChild: true },
      React.createElement("a", { href: "/contact" }, "Contact")
    )
  );

  assert.match(html, /<a[^>]*href="\/contact"/);
  assert.doesNotMatch(html, /<button/);
});
