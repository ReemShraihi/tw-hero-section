import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

type Item = Record<string, any>;

export default class ForestHero extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  // Light DOM: so store fonts, sicon icons and theme CSS variables apply
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.display = "block";
  }

  private get c(): Record<string, any> {
    return this.config ?? {};
  }

  private list(key: string): Item[] {
    const v = this.c[key];
    return Array.isArray(v) ? v : [];
  }

  // Collection items may come with or without the "group." prefix
  private pick(item: Item, group: string, key: string): string {
    return item?.[key] ?? item?.[`${group}.${key}`] ?? "";
  }

  render() {
    const c = this.c;
    const accent = c.use_store_color
      ? "var(--color-primary, #C6F432)"
      : c.accent_color || "#C6F432";
    const trust = this.list("trust_items");
    const cards = this.list("cards");

    return html`
      <style>
        .fh { --fh-accent: #C6F432; position: relative; min-height: 100vh; color: #fff; overflow: hidden; background: color-mix(in srgb, var(--fh-accent) 6%, #070907); }
        .fh__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .fh__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,6,6,.35), rgba(6,6,6,.75)); }
        .fh__inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 120px 16px 64px; gap: 24px; max-width: 1100px; margin: 0 auto; box-sizing: border-box; }
        .fh__badge { display: inline-flex; align-items: center; gap: 10px; padding: 6px 8px 6px 16px; border: 1px solid color-mix(in srgb, var(--fh-accent) 25%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--fh-accent) 14%, rgba(10,10,10,.6)); backdrop-filter: blur(12px); font-size: 13px; color: #fff; text-decoration: none; }
        .fh__badge-label { padding: 4px 12px; border-radius: 999px; background: color-mix(in srgb, var(--fh-accent) 18%, transparent); color: var(--fh-accent); font-weight: 700; }        .fh__title { display: flex; flex-direction: column; gap: 8px; margin: 24px 0 0; font-size: clamp(44px, 8vw, 80px); line-height: 1.2; font-weight: 800; }
        .fh__title em { font-style: normal; color: var(--fh-accent); }
        .fh__desc { max-width: 560px; margin: 0; font-size: 18px; line-height: 1.8; opacity: .9; }
        .fh__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 36px; border-radius: 999px; background: linear-gradient(90deg, #fff, var(--fh-accent)); color: #111; font-weight: 700; text-decoration: none; }
        .fh__trust { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin: 0; padding: 0; list-style: none; font-size: 13px; color: var(--fh-accent); }
        .fh__cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; width: 100%; max-width: 960px; margin-top: 56px; }
        .fh__card { padding: 24px; border: 1px solid color-mix(in srgb, var(--fh-accent) 22%, rgba(255,255,255,.1)); border-radius: 24px; background: color-mix(in srgb, var(--fh-accent) 12%, rgba(10,10,10,.5)); backdrop-filter: blur(14px); }        .fh__card i { font-size: 28px; color: var(--fh-accent); }
        .fh__card h3 { margin: 12px 0 8px; font-size: 16px; color: var(--fh-accent); }
        .fh__card p { margin: 0; font-size: 14px; line-height: 1.7; opacity: .9; }
      </style>

      <section class="fh" style="--fh-accent: ${accent};">
        ${c.bg_image
          ? html`<img class="fh__bg" src="${c.bg_image}" alt="" loading="eager" />`
          : nothing}
        <div class="fh__overlay"></div>

        <div class="fh__inner">
          ${c.badge_text
            ? html`<a class="fh__badge" href="${c.badge_url || "#"}">
                ${c.badge_label
                  ? html`<span class="fh__badge-label">${c.badge_label}</span>`
                  : nothing}
                <span>${c.badge_text}</span>
                <i class="sicon-keyboard_arrow_left"></i>
              </a>`
            : nothing}

          <h1 class="fh__title">
            <span>${c.title_1}</span>
            <span><em>${c.title_highlight}</em> ${c.title_2}</span>
          </h1>

          <p class="fh__desc">${c.description}</p>

          ${c.btn_text
            ? html`<a class="fh__btn" href="${c.btn_url || "#"}">
                ${c.btn_text} <i class="sicon-keyboard_arrow_left"></i>
              </a>`
            : nothing}

          ${trust.length
            ? html`<ul class="fh__trust">
                ${trust.map(
                  (t) => html`<li><i class="sicon-check"></i> ${this.pick(t, "trust_items", "text")}</li>`
                )}
              </ul>`
            : nothing}

          ${cards.length
            ? html`<div class="fh__cards">
                ${cards.map(
                  (card) => html`<div class="fh__card">
                    <i class="${this.pick(card, "cards", "icon")}"></i>
                    <h3>${this.pick(card, "cards", "title")}</h3>
                    <p>${this.pick(card, "cards", "text")}</p>
                  </div>`
                )}
              </div>`
            : nothing}
        </div>
      </section>
    `;
  }
}