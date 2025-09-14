export const colorIndex: Record<string, string> = {
    "#f2b8b5": "var(--gm3-sys-color-error)",
    "#b3261e": "var(--gm3-sys-color-error)",

    // Generic Hover
    "#f1f3f4": "color-mix(in oklab, transparent, currentColor 8%)",
    "#e8ebee": "color-mix(in oklab, transparent, currentColor 8%)",
    "#f5f5f5": "color-mix(in oklab, transparent, currentColor 8%)",
    "#f8fbff": "color-mix(in oklab, transparent, currentColor 8%)",
    "hsla(0,0%,4%,.04)": "color-mix(in oklab, transparent, currentColor 8%)",
    "rgba(0,0,0,.06)": "color-mix(in oklab, transparent, currentColor 8%)",
    "rgba(60,64,67,.04)": "color-mix(in oklab, transparent, currentColor 8%)",
    "rgba(68,71,70,.08)": "color-mix(in oklab, transparent, currentColor 8%)",
    "rgba(31,31,31,.08)": "color-mix(in oklab, transparent, currentColor 8%)",

    // Generic Press/Focus

    "#e8eaed": "color-mix(in oklab, transparent, currentColor 12%)",
    "#e9f1fe": "color-mix(in oklab, transparent, currentColor 12%)",
    "#e1ecfe": "color-mix(in oklab, transparent, currentColor 12%)",
    "#e1e3e6": "color-mix(in oklab, transparent, currentColor 12%)",
    "hsla(0,0%,4%,.12)": "color-mix(in oklab, transparent, currentColor 12%)",
    "rgba(60,64,67,.06)": "color-mix(in oklab, transparent, currentColor 12%)",
    "rgba(68,71,70,.12)": "color-mix(in oklab, transparent, currentColor 12%)",

    // Accent press
    "#efefef": "color-mix(in oklab, transparent, currentColor 18%)",

    // On surface

    "#444746": "var(--gm3-sys-color-on-surface-variant)",
    "#5f6368": "var(--gm3-sys-color-on-surface-variant)",
    "#5F6366": "var(--gm3-sys-color-on-surface-variant)",
    "#767676": "var(--gm3-sys-color-on-surface-variant)",
    "#80868b": "var(--gm3-sys-color-on-surface-variant)",
    "#616161": "var(--gm3-sys-color-on-surface-variant)",
    "#333": "var(--gm3-sys-color-on-surface-variant)",

    "#000": "var(--gm3-sys-color-on-surface)",
    "#202124": "var(--gm3-sys-color-on-surface)",
    "#3c4043": "var(--gm3-sys-color-on-surface)",
    "rgba(0,0,0,.7)": "var(--gm3-sys-color-on-surface)",
    "rgba(0,0,0,.87)": "var(--gm3-sys-color-on-surface)",

    // Disabled
    "rgba(31,31,31,.38)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-on-surface) 50%)",

    // Base
    "rgba(60,64,67,.9)": "var(--gm3-sys-color-inverse-surface)",
    "#1f1f1f": "var(--gm3-sys-color-inverse-surface)",
    "#2a2a2a": "var(--gm3-sys-color-inverse-surface)",
    "#303030": "var(--gm3-sys-color-inverse-surface)",
    "#f2f2f2": "var(--gm3-sys-color-inverse-on-surface)",

    // Base
    "#c2e7ff": "var(--gm3-sys-color-secondary-container)",
    "#bdbdbd": "var(--gm3-sys-color-secondary-container)",
    "#d5dae1": "var(--gm3-sys-color-secondary-container)",
    "#004a77": "var(--gm3-sys-color-on-secondary-container)",
    "#001d35": "var(--gm3-sys-color-on-secondary-container)",

    // Disabled
    "#e4e4e4":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-surface-container-highest) 50%)",

    // Hover
    "#b2d7ef":
        "color-mix(in oklab, var(--gm3-sys-color-secondary-container), currentColor 8%)",
    "#abcfe7":
        "color-mix(in oklab, var(--gm3-sys-color-secondary-container), currentColor 12%)",

    // Base
    "#d3e3fd": "var(--gm3-sys-color-primary-container)",
    "#e8f0fe": "var(--gm3-sys-color-primary-container)",
    "#041e49": "var(--gm3-sys-color-on-primary-container)",

    // Hover

    "#cbdbf6":
        "color-mix(in oklab, var(--gm3-sys-color-primary-container), currentColor 8%)",

    // Press
    "#b9cbe7":
        "color-mix(in oklab, var(--gm3-sys-color-primary-container), currentColor 12%)",

    // ---

    // Base

    "#fff": "var(--gm3-sys-color-surface-container-lowest)",
    "#ffffff": "var(--gm3-sys-color-surface-container-lowest)",

    // Hover
    "#e1e3e1":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-lowest), currentColor 8%)",

    // Base

    "#fafafa": "var(--gm3-sys-color-surface-container-low)",

    "#f8fafd": "var(--gm3-sys-color-surface-container-low)",
    "#f9fbfd": "var(--gm3-sys-color-surface-container-low)",
    // "#f0f4f9": "var(--gm3-sys-color-surface-container-low)",
    "#edf2fa": "var(--gm3-sys-color-surface-container-low)",

    // Hover
    "#dce1e8":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-low), currentColor 8%)",
    "#e7edf8":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-low), currentColor 8%)",

    // Base
    "#f0f4f9": "var(--gm3-sys-color-surface-container)",
    "#f3f6fc": "var(--gm3-sys-color-surface-container)",
    "#eee": "var(--gm3-sys-color-surface-container)",

    "#e3e3e3": "var(--gm3-sys-color-surface-container-high)",
    "#e9eef6": "var(--gm3-sys-color-surface-container-high)",
    "#dde3ea": "var(--gm3-sys-color-surface-container-highest)",

    // Hover
    "#d3d3d3":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-high), currentColor 8%)",
    "#d4dce8":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-highest), var(--gm3-sys-color-primary) 8%)",
    "#d4dce7":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-highest), var(--gm3-sys-color-primary) 8%)",
    // Pressed
    "#cfd9e8":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-highest), var(--gm3-sys-color-primary) 12%)",

    // Tabs
    "#dae3f2": "var(--gm3-sys-color-surface-container-high)",
    "#dfe7f3":
        "color-mix(in oklab, var(--gm3-sys-color-surface-container-high), currentColor 8%)",
    "#d3dbe5": "var(--gm3-sys-color-surface-container-highest)",

    // ---

    // Primary
    "#0b57d0": "var(--gm3-sys-color-primary)",
    "#15c": "var(--gm3-sys-color-primary)",
    "#1a73e8": "var(--gm3-sys-color-primary)",
    "#1967d2": "var(--gm3-sys-color-primary)",
    "#3b78e7": "var(--gm3-sys-color-primary)",
    "#4285f4": "var(--gm3-sys-color-primary)",

    // Ripple
    "rgba(66,133,244,.1)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 8%)",
    // Hover
    "#1e64d4":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 8%)",
    "#1f64d4":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 8%)",
    "#185abc":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 8%)",
    "#2b7de9":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 8%)",

    "#d2e3fc":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 8%)",
    "rgba(11,87,208,.08)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 8%)",
    "rgba(211,227,253,.6)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 8%)",
    "rgba(0,0,0,.12)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 8%)",
    // Focused
    "#2a56c6":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 12%)",
    "#286bd6":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 12%)",
    "#296bd6":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 12%)",
    "#5094ed":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 12%)",
    "#63a0ef":
        "color-mix(in oklab, var(--gm3-sys-color-primary), currentColor 12%)",
    "#ebebeb":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 12%)",
    "#d3e2fd":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 12%)",
    "rgba(11,87,208,.12)":
        "color-mix(in oklab, transparent, var(--gm3-sys-color-primary) 12%)",

    "#a8c7fa": "var(--gm3-sys-color-inverse-primary)",

    "#00639b": "var(--gm3-sys-color-secondary)",
    "#4d90fe": "var(--gm3-sys-color-secondary)",
    "#174ea6": "var(--gm3-sys-color-secondary)",

    "#146c2e": "var(--gm3-sys-color-tertiary)",
    "#188038": "var(--gm3-sys-color-tertiary)",
    "#c4eed0": "var(--gm3-sys-color-tertiary-container)",

    "#747775": "var(--gm3-sys-color-outline)",

    "#e6e6e6": "var(--gm3-sys-color-outline-variant)",
    "#c4c7c5": "var(--gm3-sys-color-outline-variant)",
    "#c7c7c7": "var(--gm3-sys-color-outline-variant)",
    "#dadce0": "var(--gm3-sys-color-outline-variant)",
    "#ddd": "var(--gm3-sys-color-outline-variant)",
    "hsla(140,1%,46%,.4)": "var(--gm3-sys-color-outline-variant)",
    // "#ff0000": "red",
};