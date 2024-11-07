import React from "react"
import { oneLineTrim } from "common-tags"
import { describe, expect, it } from "vitest"
import { renderToLiquid } from "./render"

describe("Reconciler", () => {
  it("Renders liquid tags", () => {
    expect(renderToLiquid(<liquid>{`assign message = ''`}</liquid>)).toBe(
      `{% liquid assign message = '' %}`
    )
  })

  it("Renders raw tags", () => {
    expect(renderToLiquid(<raw>{`{{ 2 | plus: 2 }} equals 4.`}</raw>)).toBe(
      `{% raw %}{{ 2 | plus: 2 }} equals 4.{% endraw %}`
    )
  })

  it("Renders javascript tags", () => {
    expect(
      renderToLiquid(<javascript>{/* js */ `console.log("hi")`}</javascript>)
    ).toBe(`{% javascript %}console.log("hi"){% endjavascript %}`)
  })

  it("Renders layout tags", () => {
    expect(renderToLiquid(<layout name="full-width" />)).toBe(
      `{% layout 'full-width' %}`
    )

    expect(renderToLiquid(<layout none />)).toBe(`{% layout none %}`)
  })

  it("Renders render tags", () => {
    expect(renderToLiquid(<render name="filename" />)).toBe(
      `{% render 'filename' %}`
    )
  })

  it("Renders section tags", () => {
    expect(renderToLiquid(<section name="name" />)).toBe(`{% section 'name' %}`)
  })

  it("Renders sections tags", () => {
    expect(renderToLiquid(<sections name="name" />)).toBe(
      `{% sections 'name' %}`
    )
  })

  it.skip("Renders unless tags", () => {
    expect(
      renderToLiquid(
        <unless condition="1 == 2">
          <div></div>
        </unless>
      )
    ).toBe(
      oneLineTrim`
        {%- unless 1 == 2 -%}
          <div></div>
        {%- endunless -%}
      `
    )
  })

  it.skip("Renders if tags", () => {
    expect(
      renderToLiquid(
        <if condition="product.type == 'Love'">
          This is a love potion!
          <elsif condition="product.type == 'Health'">
            This is a health potion!
          </elsif>
        </if>
      )
    ).toBe(
      oneLineTrim`
        {% if product.type == 'Love' %}
          This is a love potion!
        {% elsif product.type == 'Health' %}
          This is a health potion!
        {% endif %}
      `
    )

    expect(
      renderToLiquid(
        <if condition="product.available">
          This product is available!
          <else>This product is sold out!</else>
        </if>
      )
    ).toBe(
      oneLineTrim`
        {% if product.type == 'Love' %}
          This is a love potion!
        {% elsif product.type == 'Health' %}
          This is a health potion!
        {% endif %}
      `
    )
  })
})

describe.skip("Components", () => {
  describe("Control flow", () => {
    it("Switch/Match", () => {
      expect(
        renderToLiquid(
          <Switch fallback="fallback">
            <Match when="product.type == 'Love'">This is a love potion!</Match>
            <Match when="product.type == 'Health'">
              This is a health potion!
            </Match>
          </Switch>
        )
      ).toBe(
        oneLineTrim`
        {% if product.type == 'Love' %}
          This is a love potion!
        {% elsif  %}
          This is a health potion!
        {% else  %}
          fallback
        {% endif %}
      `
      )
    })
  })
})
