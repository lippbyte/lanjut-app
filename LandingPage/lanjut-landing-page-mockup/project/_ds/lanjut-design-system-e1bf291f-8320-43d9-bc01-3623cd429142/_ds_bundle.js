/* @ds-bundle: {"format":4,"namespace":"LanjutDesignSystem_e1bf29","components":[{"name":"CoverPanel","sourcePath":"components/brand/CoverPanel.jsx"},{"name":"Mascot","sourcePath":"components/brand/Mascot.jsx"},{"name":"TimelineStep","sourcePath":"components/brand/TimelineStep.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"StatusPill","sourcePath":"components/feedback/StatusPill.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AppBar","sourcePath":"components/navigation/AppBar.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/brand/CoverPanel.jsx":"e55537bb5262","components/brand/Mascot.jsx":"c002a70414e3","components/brand/TimelineStep.jsx":"a6756b735b67","components/brand/Wordmark.jsx":"b9369bb42ad4","components/core/Badge.jsx":"1ee11a8d2454","components/core/Button.jsx":"7bdf81cbcead","components/core/Card.jsx":"6bf1c85995ef","components/core/Chip.jsx":"f6cc1fe80104","components/core/IconButton.jsx":"879865190230","components/feedback/Dialog.jsx":"7ee6159f4e7b","components/feedback/EmptyState.jsx":"5aea605285ce","components/feedback/ProgressBar.jsx":"f47fcd5915cd","components/feedback/StatusPill.jsx":"b6210298fa00","components/forms/Checkbox.jsx":"062c22a69402","components/forms/Field.jsx":"aa05b3ae3f50","components/forms/Input.jsx":"95a01155f69b","components/forms/Select.jsx":"9547664b1d0f","components/forms/Switch.jsx":"b742005606cc","components/navigation/AppBar.jsx":"e9e7e55a9e5d","components/navigation/SegmentedControl.jsx":"5b3e45dcdfc6","components/navigation/TabBar.jsx":"71ee946b5df3","slides/Slides.jsx":"79dac1777608","ui_kits/lanjut-pwa/App.jsx":"372718a963f4","ui_kits/lanjut-pwa/Beranda.jsx":"a363dc4d9a83","ui_kits/lanjut-pwa/Linimasa.jsx":"5222f4e42d50","ui_kits/lanjut-pwa/Mapel.jsx":"b7175f9f3eaf","ui_kits/lanjut-pwa/Onboarding.jsx":"d25838a197a1","ui_kits/lanjut-pwa/Profil.jsx":"5cfe0854ecca","ui_kits/lanjut-pwa/Splash.jsx":"52d8747c1776"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LanjutDesignSystem_e1bf29 = window.LanjutDesignSystem_e1bf29 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/CoverPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CoverPanel({
  eyebrow,
  title,
  description,
  footer,
  mascotSrc,
  wordmarkSrc,
  radius = 'var(--radius-xl)',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: radius,
      background: 'var(--gradient-cover)',
      color: 'var(--white)',
      padding: 'var(--space-10) var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }), wordmarkSrc && /*#__PURE__*/React.createElement("img", {
    src: wordmarkSrc,
    alt: "Lanjut",
    style: {
      height: 44,
      width: 'auto',
      objectFit: 'contain',
      alignSelf: 'flex-start',
      marginBottom: 'var(--space-4)'
    }
  }), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      opacity: .9
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--text-h1)',
      color: 'var(--white)',
      maxWidth: '18ch'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'rgba(255,255,255,.9)',
      maxWidth: '34ch'
    }
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-6)'
    }
  }, footer), mascotSrc && /*#__PURE__*/React.createElement("img", {
    src: mascotSrc,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -12,
      bottom: -16,
      width: 220,
      opacity: .95,
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { CoverPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/CoverPanel.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mascot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const files = {
  blue: 'assets/mascot/mascot-blue.png',
  dark: 'assets/mascot/mascot-dark.png',
  white: 'assets/mascot/mascot-white.png',
  tile: 'assets/mascot/mascot-tile-primary.png',
  tileLight: 'assets/mascot/mascot-tile-light.png',
  tileInset: 'assets/mascot/mascot-tile-inset.png'
};
function Mascot({
  variant = 'blue',
  size = 120,
  basePath = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({}, rest, {
    src: basePath + files[variant],
    alt: "",
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'block',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Mascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/brand/TimelineStep.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const dotColor = {
  done: 'var(--status-ok)',
  soon: 'var(--blue-400)',
  idle: 'var(--ink-300)'
};
function TimelineStep({
  date,
  title,
  description,
  status = 'idle',
  last = false,
  trailing,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'grid',
      gridTemplateColumns: '20px 1fr',
      gap: 'var(--space-4)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      marginTop: 5,
      flexShrink: 0,
      background: status === 'idle' ? 'var(--white)' : dotColor[status],
      border: '2px solid ' + dotColor[status],
      boxShadow: status === 'soon' ? '0 0 0 4px rgba(120,164,203,.22)' : 'none'
    }
  }), !last && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 2,
      background: 'var(--border-soft)',
      marginTop: 6,
      borderRadius: 1
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last ? 0 : 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-muted)',
      letterSpacing: 'var(--ls-caption)'
    }
  }, date), trailing), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-title)',
      fontWeight: 'var(--fw-semibold)',
      marginTop: 2
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'var(--text-muted)',
      marginTop: 4,
      maxWidth: '46ch'
    }
  }, description), children));
}
Object.assign(__ds_scope, { TimelineStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/TimelineStep.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const files = {
  badge: 'assets/logo/lanjut-wordmark-badge.png',
  standalone: 'assets/logo/lanjut-wordmark-standalone.png'
};
function Wordmark({
  variant = 'badge',
  height = 48,
  basePath = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({}, rest, {
    src: basePath + files[variant],
    alt: "Lanjut",
    style: {
      height,
      width: 'auto',
      display: 'block',
      objectFit: 'contain',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    background: 'var(--ink-100)',
    color: 'var(--ink-700)'
  },
  brand: {
    background: 'var(--blue-200)',
    color: 'var(--blue-600)'
  },
  solid: {
    background: 'var(--blue-400)',
    color: 'var(--white)'
  },
  onDark: {
    background: 'rgba(255,255,255,.22)',
    color: 'var(--white)'
  }
};
function Badge({
  tone = 'brand',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--text-caption)',
      fontWeight: 'var(--fw-medium)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      ...tones[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-core)',
  fontWeight: 'var(--fw-semibold)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  border: '1px solid transparent',
  borderRadius: 'var(--radius-pill)',
  cursor: 'pointer',
  transition: 'background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
  textDecoration: 'none',
  whiteSpace: 'nowrap'
};
const sizes = {
  sm: {
    fontSize: 'var(--fs-body-sm)',
    padding: '8px 16px',
    minHeight: 36
  },
  md: {
    fontSize: 'var(--fs-body)',
    padding: '12px 22px',
    minHeight: 44
  },
  lg: {
    fontSize: 'var(--fs-body-lg)',
    padding: '16px 28px',
    minHeight: 52
  }
};
const variants = {
  primary: {
    background: 'var(--blue-400)',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-2)'
  },
  secondary: {
    background: 'var(--blue-200)',
    color: 'var(--blue-600)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--blue-600)'
  },
  outline: {
    background: 'var(--white)',
    color: 'var(--blue-600)',
    borderColor: 'var(--border-brand)'
  }
};
const hovers = {
  primary: {
    background: 'var(--blue-500)'
  },
  secondary: {
    background: '#A8D6E3'
  },
  ghost: {
    background: 'var(--blue-100)'
  },
  outline: {
    background: 'var(--blue-100)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  iconAfter,
  as = 'button',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      width: fullWidth ? '100%' : undefined,
      transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      ...style
    }
  }), icon, children, iconAfter);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  plain: {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-hairline)'
  },
  soft: {
    background: 'var(--surface-soft)',
    border: '1px solid var(--border-soft)'
  },
  brand: {
    background: 'var(--gradient-tile)',
    border: '1px solid transparent',
    color: 'var(--white)'
  },
  outline: {
    background: 'var(--white)',
    border: '1px solid var(--border-brand)'
  }
};
function Card({
  tone = 'plain',
  padding = 'var(--card-padding)',
  elevation = 1,
  interactive = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shadows = ['var(--shadow-0)', 'var(--shadow-1)', 'var(--shadow-2)', 'var(--shadow-3)', 'var(--shadow-4)'];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      ...tones[tone],
      boxShadow: shadows[interactive && hover ? Math.min(elevation + 1, 4) : elevation],
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-out-soft)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  selected = false,
  disabled = false,
  icon,
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--text-body-small)',
      fontWeight: 'var(--fw-medium)',
      padding: '10px 16px',
      minHeight: 44,
      cursor: disabled ? 'default' : 'pointer',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (selected ? 'var(--blue-400)' : 'var(--border-soft)'),
      background: selected ? 'var(--blue-400)' : hover && !disabled ? 'var(--blue-100)' : 'var(--white)',
      color: selected ? 'var(--white)' : 'var(--ink-700)',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      ...style
    }
  }), icon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 36,
  md: 44,
  lg: 52
};
function IconButton({
  label,
  size = 'md',
  variant = 'ghost',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = {
    ghost: 'transparent',
    soft: 'var(--blue-100)',
    solid: 'var(--blue-400)'
  }[variant];
  const fg = variant === 'solid' ? 'var(--white)' : 'var(--blue-600)';
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: sizes[size],
      height: sizes[size],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      color: fg,
      background: hover ? variant === 'solid' ? 'var(--blue-500)' : 'var(--blue-100)' : bg,
      transition: 'background var(--dur-base) var(--ease-standard)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  description,
  actions,
  onClose,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(26,26,26,.38)',
      backdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 420,
      background: 'var(--white)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      animation: 'lanjut-sheet-in var(--dur-slow) var(--ease-out-soft)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 4,
      borderRadius: 2,
      background: 'var(--ink-100)',
      alignSelf: 'center',
      marginBottom: 4
    }
  }), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-h3)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-default)',
      color: 'var(--text-muted)'
    }
  }, description), children, actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-2)'
    }
  }, actions)), /*#__PURE__*/React.createElement("style", null, '@keyframes lanjut-sheet-in{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}'));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  title,
  description,
  action,
  mascot = true,
  mascotSrc = 'assets/mascot/mascot-blue.png',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-10) var(--space-6)',
      ...style
    }
  }), mascot && /*#__PURE__*/React.createElement("img", {
    src: mascotSrc,
    alt: "",
    style: {
      width: 96,
      height: 96,
      objectFit: 'contain',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-h3)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'var(--text-muted)',
      maxWidth: 320
    }
  }, description), action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), showValue && /*#__PURE__*/React.createElement("span", null, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      height: 10,
      background: 'var(--ink-100)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: 'linear-gradient(90deg,var(--blue-200),var(--blue-400))',
      transition: 'width var(--dur-slow) var(--ease-out-soft)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const map = {
  done: {
    bg: 'var(--status-ok-bg)',
    fg: '#2F6B5C',
    dot: 'var(--status-ok)',
    text: 'Selesai'
  },
  soon: {
    bg: 'var(--status-attention-bg)',
    fg: 'var(--blue-600)',
    dot: 'var(--status-attention)',
    text: 'Segera'
  },
  idle: {
    bg: 'var(--status-idle-bg)',
    fg: 'var(--ink-500)',
    dot: 'var(--status-idle)',
    text: 'Belum mulai'
  }
};
function StatusPill({
  status = 'idle',
  children,
  style,
  ...rest
}) {
  const s = map[status];
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--text-caption)',
      fontWeight: 'var(--fw-medium)',
      color: s.fg,
      background: s.bg,
      padding: '5px 12px 5px 9px',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: s.dot
    }
  }), children || s.text);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      minHeight: 44,
      ...style
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flexShrink: 0,
      borderRadius: 'var(--radius-xs)',
      border: '1px solid ' + (checked ? 'var(--blue-400)' : 'var(--border-soft)'),
      background: checked ? 'var(--blue-400)' : 'var(--white)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 11,
      borderRight: '2px solid #fff',
      borderBottom: '2px solid #fff',
      transform: 'rotate(45deg) translate(-1px,-1px)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-default)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--text-body-small)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--ink-700)'
    }
  }, label), children, (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: error ? 'var(--blue-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  invalid = false,
  icon,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      display: 'flex',
      color: 'var(--ink-500)'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      width: '100%',
      font: 'var(--text-body-default)',
      color: 'var(--ink-900)',
      padding: icon ? '13px 16px 13px 42px' : '13px 16px',
      minHeight: 48,
      background: 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (invalid ? 'var(--blue-500)' : focus ? 'var(--blue-400)' : 'var(--border-soft)'),
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      appearance: 'none',
      font: 'var(--text-body-default)',
      color: 'var(--ink-900)',
      padding: '13px 44px 13px 16px',
      minHeight: 48,
      background: 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (focus ? 'var(--blue-400)' : 'var(--border-soft)'),
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      outline: 'none',
      cursor: 'pointer',
      ...style
    }
  }), options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 18,
      top: '50%',
      transform: 'translateY(-60%) rotate(45deg)',
      width: 8,
      height: 8,
      borderRight: '2px solid var(--ink-500)',
      borderBottom: '2px solid var(--ink-500)',
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      minHeight: 44,
      ...style
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 28,
      borderRadius: 'var(--radius-pill)',
      flexShrink: 0,
      background: checked ? 'var(--blue-400)' : 'var(--ink-100)',
      transition: 'background var(--dur-base) var(--ease-standard)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-1)',
      transition: 'left var(--dur-base) var(--ease-out-soft)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-default)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AppBar({
  title,
  subtitle,
  leading,
  trailing,
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'brand';
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '14px var(--gutter-screen)',
      minHeight: 64,
      background: dark ? 'var(--gradient-tile)' : 'var(--white)',
      color: dark ? 'var(--white)' : 'var(--ink-900)',
      borderBottom: dark ? 'none' : '1px solid var(--border-hairline)',
      ...style
    }
  }), leading, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-title)',
      fontWeight: 'var(--fw-semibold)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: dark ? 'rgba(255,255,255,.8)' : 'var(--text-muted)'
    }
  }, subtitle)), trailing);
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      padding: 4,
      gap: 4,
      background: 'var(--ink-050)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        border: 0,
        cursor: 'pointer',
        padding: '9px 18px',
        minHeight: 40,
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-body-small)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        background: active ? 'var(--white)' : 'transparent',
        color: active ? 'var(--blue-600)' : 'var(--ink-500)',
        boxShadow: active ? 'var(--shadow-1)' : 'none',
        transition: 'background var(--dur-base) var(--ease-standard)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TabBar({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length},1fr)`,
      background: 'var(--white)',
      borderTop: '1px solid var(--border-hairline)',
      padding: '8px 8px 12px',
      ...style
    }
  }), items.map(it => {
    const active = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onChange && onChange(it.id),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        padding: '6px 0',
        minHeight: 48,
        color: active ? 'var(--blue-600)' : 'var(--ink-500)',
        font: 'var(--text-caption)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-regular)',
        transition: 'color var(--dur-base) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 28,
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--blue-100)' : 'transparent',
        transition: 'background var(--dur-base) var(--ease-standard)'
      }
    }, it.icon), it.label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// slides/Slides.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card,
  Badge,
  StatusPill,
  TimelineStep,
  Chip,
  ProgressBar
} = window.LanjutDesignSystem_e1bf29;
const A = '../assets/';

/* Shared slide shell: 1280x720, 88px margin, Poppins, one idea per slide. */
function Slide({
  tone = 'light',
  children,
  style
}) {
  const bg = {
    light: 'var(--white)',
    soft: 'var(--surface-soft)',
    brand: 'var(--gradient-cover)'
  }[tone];
  return /*#__PURE__*/React.createElement("section", {
    className: "slide",
    style: {
      background: bg,
      color: tone === 'brand' ? 'var(--white)' : 'var(--ink-900)',
      padding: 'var(--gutter-slide)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  onBrand
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: onBrand ? 'rgba(255,255,255,.85)' : 'var(--blue-600)'
    }
  }, children);
}
function SlideFooter({
  page,
  onBrand
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--gutter-slide)',
      right: 'var(--gutter-slide)',
      bottom: 40,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: 'var(--text-caption)',
      color: onBrand ? 'rgba(255,255,255,.7)' : 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + (onBrand ? 'logo/lanjut-wordmark-standalone.png' : 'logo/lanjut-wordmark-badge.png'),
    alt: "Lanjut",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", null, page));
}

/* 1. Cover — gradient, mascot, wordmark. The mascot appears here and on the closing slide only. */
function TitleSlide({
  eyebrow = 'Sosialisasi kelas 12 · 2026',
  title = 'Kuliah itu jalur, bukan lompatan.',
  subtitle = 'Memahami TKA, SNBP dan SNBT sebelum tanggalnya datang.',
  presenter = 'EDILAKSO GROUP'
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "brand",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + 'logo/lanjut-wordmark-standalone.png',
    alt: "Lanjut",
    style: {
      height: 72,
      alignSelf: 'flex-start',
      marginBottom: 48
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    onBrand: true
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--text-display)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--white)',
      maxWidth: '15ch',
      marginTop: 16
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-regular) var(--fs-body-lg)/var(--lh-body-lg) var(--font-core)',
      color: 'rgba(255,255,255,.9)',
      maxWidth: '42ch',
      marginTop: 20
    }
  }, subtitle), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 'var(--gutter-slide)',
      bottom: 56,
      font: 'var(--text-body-small)',
      color: 'rgba(255,255,255,.8)'
    }
  }, presenter), /*#__PURE__*/React.createElement("img", {
    src: A + 'mascot/mascot-white.png',
    alt: "",
    style: {
      position: 'absolute',
      right: 56,
      bottom: -24,
      width: 420
    }
  }));
}

/* 2. Section divider — soft blue, big number. */
function SectionSlide({
  number = '01',
  title = 'Linimasa',
  description = 'Apa yang terjadi, dan kapan.'
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "soft",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 180px/1 var(--font-core)',
      color: 'var(--blue-200)',
      position: 'absolute',
      right: 88,
      top: 60
    }
  }, number), /*#__PURE__*/React.createElement(Eyebrow, null, "Bagian ", number), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h1)',
      marginTop: 12
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-regular) var(--fs-body-lg)/var(--lh-body-lg) var(--font-core)',
      color: 'var(--ink-700)',
      maxWidth: '38ch',
      marginTop: 12
    }
  }, description), /*#__PURE__*/React.createElement(SlideFooter, {
    page: number
  }));
}

/* 3. Agenda — numbered list, no bullets. */
function AgendaSlide({
  items = ['Kenapa harus siap dari sekarang', 'Tiga jalur: SNBP, SNBT, mandiri', 'Linimasa lengkap 2026–2027', 'Memilih dua mapel pilihan', 'Checklist berkas']
}) {
  return /*#__PURE__*/React.createElement(Slide, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Agenda"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h1)',
      marginTop: 12,
      marginBottom: 40
    }
  }, "Yang kita bahas hari ini"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: 18,
      maxWidth: 820
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      font: 'var(--fw-medium) 26px/1.3 var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--blue-100)',
      color: 'var(--blue-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--fw-semibold) 18px var(--font-core)',
      flex: 'none'
    }
  }, i + 1), it))), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Agenda"
  }));
}

/* 4. Timeline — the deck's signature slide, reuses TimelineStep. */
function TimelineSlide() {
  const steps = [{
    date: 'Oktober 2026',
    title: 'TKA',
    description: 'Tes Kemampuan Akademik untuk kelas 12.',
    status: 'done'
  }, {
    date: 'Desember 2026',
    title: 'Sekolah mengisi PDSS',
    description: 'Nilai rapor semester 1–5 diunggah.',
    status: 'done'
  }, {
    date: 'Januari 2027',
    title: 'Registrasi akun SNPMB',
    status: 'soon'
  }, {
    date: '4 – 18 Februari 2027',
    title: 'Pendaftaran SNBP',
    description: 'Dua pilihan program studi, berurutan.',
    status: 'soon'
  }, {
    date: 'Maret – April 2027',
    title: 'UTBK-SNBT',
    status: 'idle'
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "light"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Linimasa"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h2)',
      marginTop: 12,
      marginBottom: 32
    }
  }, "Dari TKA sampai pengumuman"), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 32,
      maxWidth: 940
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(TimelineStep, _extends({
    key: s.title
  }, s, {
    last: i === steps.length - 1,
    trailing: /*#__PURE__*/React.createElement(StatusPill, {
      status: s.status
    })
  })))), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Linimasa"
  }));
}

/* 5. Comparison — two or three columns, equal weight. */
function ComparisonSlide({
  columns = [{
    title: 'SNBP',
    lead: 'Tanpa tes',
    points: ['Berdasarkan nilai rapor semester 1–5', 'Sekolah menentukan siswa eligible', 'Gratis, satu kali kesempatan']
  }, {
    title: 'SNBT',
    lead: 'Lewat UTBK',
    points: ['Tes skolastik dan literasi', 'Daftar sendiri lewat akun SNPMB', 'Berbayar, hasil berlaku satu tahun']
  }, {
    title: 'Mandiri',
    lead: 'Jalur kampus',
    points: ['Syarat berbeda tiap PTN', 'Bisa memakai nilai UTBK', 'Biaya dan jadwal bervariasi']
  }]
}) {
  return /*#__PURE__*/React.createElement(Slide, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Tiga jalur"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h2)',
      marginTop: 12,
      marginBottom: 32
    }
  }, "Bedanya di mana?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement(Card, {
    key: c.title,
    tone: i === 0 ? 'brand' : 'plain',
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: i === 0 ? 'onDark' : 'brand',
    style: {
      alignSelf: 'flex-start'
    }
  }, c.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      color: i === 0 ? 'var(--white)' : 'var(--ink-900)'
    }
  }, c.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      display: 'grid',
      gap: 10,
      font: 'var(--fw-regular) 17px/1.5 var(--font-core)',
      color: i === 0 ? 'rgba(255,255,255,.92)' : 'var(--ink-700)'
    }
  }, c.points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, p)))))), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Jalur"
  }));
}

/* 6. Big number — one figure, one sentence. */
function BigStatSlide({
  stat = '2',
  unit = 'mapel pilihan',
  description = 'Setiap siswa memilih dua mapel pilihan untuk TKA. Pilih yang sejalan dengan program studi incaranmu, bukan yang paling gampang.'
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "soft",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 220px/.9 var(--font-core)',
      letterSpacing: '-.03em',
      color: 'var(--blue-400)'
    }
  }, stat), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h2)',
      color: 'var(--ink-700)'
    }
  }, unit)), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-regular) 24px/1.5 var(--font-core)',
      color: 'var(--ink-700)',
      maxWidth: '38ch',
      marginTop: 28
    }
  }, description), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Mapel"
  }));
}

/* 7. Quote — student voice, no quotation-mark decoration. */
function BigQuoteSlide({
  quote = 'Aku kira anak SMK nggak bisa ikut SNBP. Ternyata bisa, asal jurusannya nyambung.',
  attribution = 'Rani, RPL — SMKN 4 Bandung'
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "brand",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-medium) 46px/1.28 var(--font-core)',
      letterSpacing: '-.01em',
      color: 'var(--white)',
      maxWidth: '20ch'
    }
  }, quote), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'rgba(255,255,255,.85)',
      marginTop: 28
    }
  }, attribution), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Suara siswa",
    onBrand: true
  }));
}

/* 8. Checklist — action items with progress. */
function ChecklistSlide({
  items = ['Buat akun SNPMB', 'Cek nilai rapor semester 1–5 di PDSS', 'Tentukan dua mapel pilihan', 'Kumpulkan sertifikat prestasi', 'Susun dua pilihan program studi']
}) {
  return /*#__PURE__*/React.createElement(Slide, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Langkah berikutnya"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h2)',
      marginTop: 12,
      marginBottom: 28
    }
  }, "Yang bisa kamu kerjakan minggu ini"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      maxWidth: 940
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Card, {
    key: it,
    tone: "soft",
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: '2px solid var(--blue-400)',
      background: i < 2 ? 'var(--blue-400)' : 'transparent',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 19px/1.4 var(--font-core)'
    }
  }, it)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 2,
    max: 5,
    label: "Contoh progres kelas",
    showValue: true
  })), /*#__PURE__*/React.createElement(SlideFooter, {
    page: "Checklist"
  }));
}

/* 9. Closing — mascot returns, parent brand credited. */
function ClosingSlide({
  title = 'Mulai dari satu langkah kecil.',
  description = 'Buka Lanjut, cek linimasa kamu, dan tandai satu hal untuk dikerjakan minggu ini.'
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    tone: "brand",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h1)',
      color: 'var(--white)',
      maxWidth: '16ch'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-regular) var(--fs-body-lg)/var(--lh-body-lg) var(--font-core)',
      color: 'rgba(255,255,255,.9)',
      maxWidth: '36ch',
      marginTop: 18
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + 'logo/lanjut-wordmark-standalone.png',
    alt: "Lanjut",
    style: {
      height: 46
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 34,
      background: 'rgba(255,255,255,.4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-small)',
      color: 'rgba(255,255,255,.85)'
    }
  }, "oleh EDILAKSO GROUP")), /*#__PURE__*/React.createElement("img", {
    src: A + 'mascot/mascot-white.png',
    alt: "",
    style: {
      position: 'absolute',
      right: 80,
      bottom: -20,
      width: 380
    }
  }));
}
Object.assign(window, {
  Slide,
  Eyebrow,
  SlideFooter,
  TitleSlide,
  SectionSlide,
  AgendaSlide,
  TimelineSlide,
  ComparisonSlide,
  BigStatSlide,
  BigQuoteSlide,
  ChecklistSlide,
  ClosingSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/Slides.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/App.jsx
try { (() => {
const {
  TabBar
} = window.LanjutDesignSystem_e1bf29;
const NAV = [{
  id: 'beranda',
  label: 'Beranda',
  icon: /*#__PURE__*/React.createElement(Glyph, {
    d: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"
  })
}, {
  id: 'linimasa',
  label: 'Linimasa',
  icon: /*#__PURE__*/React.createElement(Glyph, {
    d: "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 4v5l3.5 2"
  })
}, {
  id: 'mapel',
  label: 'Mapel',
  icon: /*#__PURE__*/React.createElement(Glyph, {
    d: "M4 5h16M4 12h16M4 19h10"
  })
}, {
  id: 'profil',
  label: 'Profil',
  icon: /*#__PURE__*/React.createElement(Glyph, {
    d: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0"
  })
}];
function App() {
  const [stage, setStage] = React.useState('splash');
  const [tab, setTab] = React.useState('beranda');
  React.useEffect(() => {
    if (stage !== 'splash') return;
    const t = setTimeout(() => setStage('onboarding'), 1800);
    return () => clearTimeout(t);
  }, [stage]);
  if (stage === 'splash') return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement(Splash, {
    onSkip: () => setStage('onboarding')
  }));
  if (stage === 'onboarding') return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement(Onboarding, {
    onDone: () => setStage('app')
  }));
  const screens = {
    beranda: /*#__PURE__*/React.createElement(Beranda, {
      onOpenLinimasa: () => setTab('linimasa')
    }),
    linimasa: /*#__PURE__*/React.createElement(Linimasa, null),
    mapel: /*#__PURE__*/React.createElement(Mapel, null),
    profil: /*#__PURE__*/React.createElement(Profil, null)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    key: tab,
    style: {
      animation: 'fade var(--dur-page) var(--ease-out-soft)'
    }
  }, screens[tab]), /*#__PURE__*/React.createElement(TabBar, {
    items: NAV,
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Beranda.jsx
try { (() => {
const {
  AppBar,
  IconButton,
  Card,
  Badge,
  Button,
  ProgressBar,
  StatusPill,
  TimelineStep
} = window.LanjutDesignSystem_e1bf29;
function Beranda({
  onOpenLinimasa
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    tone: "brand",
    title: "Halo, Rani",
    subtitle: "SMKN 4 Bandung \xB7 RPL",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      label: "Notifikasi",
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      d: "M18 8a6 6 0 1 0-12 0c0 7-2 8-2 8h16s-2-1-2-8M13.7 21a2 2 0 0 1-3.4 0"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--gutter-screen)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "brand",
    elevation: 2,
    interactive: true,
    onClick: onOpenLinimasa,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Jalur utama"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      color: 'var(--white)'
    }
  }, "92 hari"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'rgba(255,255,255,.9)'
    }
  }, "menuju pendaftaran SNBP dibuka, 4 Februari 2027.")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 4,
    max: 7,
    label: "Persiapan berkas",
    showValue: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary"
  }, "Lanjutkan checklist"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Lihat semua"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-h3)'
    }
  }, "Berikutnya"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenLinimasa,
    style: {
      border: 0,
      background: 'none',
      font: 'var(--text-body-small)',
      color: 'var(--text-link)',
      cursor: 'pointer'
    }
  }, "Linimasa")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(TimelineStep, {
    date: "4 \u2013 18 Februari 2027",
    title: "Pendaftaran SNBP",
    description: "Sekolah menetapkan siswa eligible lewat PDSS.",
    status: "soon",
    trailing: /*#__PURE__*/React.createElement(StatusPill, {
      status: "soon"
    })
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    date: "Maret 2027",
    title: "Pendaftaran UTBK-SNBT",
    status: "idle",
    last: true,
    trailing: /*#__PURE__*/React.createElement(StatusPill, {
      status: "idle"
    })
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "soft",
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-title)'
    }
  }, "Mapel pilihan kamu"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "Matematika Lanjut \xB7 Bahasa Inggris Lanjut")), /*#__PURE__*/React.createElement(IconButton, {
    label: "Ubah mapel",
    variant: "soft"
  }, /*#__PURE__*/React.createElement(Glyph, {
    d: "M9 6l6 6-6 6"
  })))));
}
Object.assign(window, {
  Beranda
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Beranda.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Linimasa.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  AppBar,
  IconButton,
  Card,
  SegmentedControl,
  TimelineStep,
  StatusPill
} = window.LanjutDesignSystem_e1bf29;
const DATA = {
  SNBP: [{
    date: 'Oktober 2026',
    title: 'TKA digelar',
    description: 'Tes Kemampuan Akademik untuk siswa kelas 12.',
    status: 'done'
  }, {
    date: 'Desember 2026',
    title: 'Pengisian PDSS oleh sekolah',
    description: 'Sekolah mengunggah nilai rapor semester 1–5.',
    status: 'done'
  }, {
    date: 'Januari 2027',
    title: 'Registrasi akun SNPMB',
    description: 'Buat akun dan lengkapi biodata sebelum pendaftaran dibuka.',
    status: 'soon'
  }, {
    date: '4 – 18 Februari 2027',
    title: 'Pendaftaran SNBP',
    description: 'Pilih dua program studi. Urutan pilihan menentukan prioritas.',
    status: 'soon'
  }, {
    date: 'Maret 2027',
    title: 'Pengumuman hasil SNBP',
    status: 'idle'
  }],
  SNBT: [{
    date: 'Januari 2027',
    title: 'Registrasi akun SNPMB',
    status: 'done'
  }, {
    date: 'Maret 2027',
    title: 'Pendaftaran UTBK-SNBT',
    description: 'Tentukan pusat UTBK dan bayar biaya pendaftaran.',
    status: 'soon'
  }, {
    date: 'April 2027',
    title: 'Pelaksanaan UTBK',
    description: 'Dua gelombang, masing-masing beberapa hari.',
    status: 'idle'
  }, {
    date: 'Juni 2027',
    title: 'Pengumuman hasil SNBT',
    status: 'idle'
  }],
  Mandiri: [{
    date: 'Mei – Juli 2027',
    title: 'Pendaftaran jalur mandiri PTN',
    description: 'Jadwal berbeda di tiap kampus. Cek situs resmi masing-masing.',
    status: 'idle'
  }, {
    date: 'Juli 2027',
    title: 'Ujian mandiri',
    status: 'idle'
  }, {
    date: 'Agustus 2027',
    title: 'Daftar ulang',
    status: 'idle'
  }]
};
function Linimasa() {
  const [jalur, setJalur] = React.useState('SNBP');
  const steps = DATA[jalur];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Linimasa",
    subtitle: "Tahun masuk 2027",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      label: "Filter"
    }, /*#__PURE__*/React.createElement(Glyph, {
      d: "M4 6h16M7 12h10M10 18h4"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--gutter-screen)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['SNBP', 'SNBT', 'Mandiri'],
    value: jalur,
    onChange: setJalur,
    style: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    key: jalur,
    style: {
      animation: 'fadein var(--dur-slow) var(--ease-out-soft)'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(TimelineStep, _extends({
    key: s.title
  }, s, {
    last: i === steps.length - 1,
    trailing: /*#__PURE__*/React.createElement(StatusPill, {
      status: s.status
    })
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, "Tanggal mengikuti jadwal resmi SNPMB dan bisa berubah. Selalu cek pengumuman sekolah."), /*#__PURE__*/React.createElement("style", null, '@keyframes fadein{from{opacity:0}to{opacity:1}}')));
}
Object.assign(window, {
  Linimasa
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Linimasa.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Mapel.jsx
try { (() => {
const {
  AppBar,
  Card,
  Chip,
  Button,
  Dialog,
  Input,
  Badge
} = window.LanjutDesignSystem_e1bf29;
const MAPEL = ['Matematika Lanjut', 'Bahasa Inggris Lanjut', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi', 'Sosiologi', 'Geografi', 'Informatika', 'Bahasa Indonesia Lanjut'];
function Mapel() {
  const [picked, setPicked] = React.useState(['Matematika Lanjut', 'Bahasa Inggris Lanjut']);
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const toggle = m => setPicked(p => p.includes(m) ? p.filter(x => x !== m) : p.length < 2 ? [...p, m] : p);
  const list = MAPEL.filter(m => m.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    title: "Pilih mapel",
    subtitle: "Dua mapel pilihan untuk TKA"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--gutter-screen)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Cari mapel",
    value: q,
    onChange: e => setQ(e.target.value),
    icon: /*#__PURE__*/React.createElement(Glyph, {
      size: 18,
      d: "M11 19a8 8 0 1 0-8-8 8 8 0 0 0 8 8Zm10 2-4.5-4.5"
    })
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "soft",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, picked.length, "/2"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'var(--ink-700)',
      flex: 1
    }
  }, picked.length === 2 ? 'Pilihan kamu sudah lengkap. Bisa diubah sampai pendaftaran dibuka.' : 'Pilih satu lagi yang paling cocok dengan program studi incaranmu.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2)'
    }
  }, list.map(m => /*#__PURE__*/React.createElement(Chip, {
    key: m,
    selected: picked.includes(m),
    onClick: () => toggle(m)
  }, m))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    disabled: picked.length !== 2,
    onClick: () => setOpen(true)
  }, "Simpan pilihan")), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: () => setOpen(false),
    title: "Pilihan mapel tersimpan",
    description: picked.join(' · ') + '. Kamu masih bisa mengubahnya sampai pendaftaran dibuka.',
    actions: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      onClick: () => setOpen(false)
    }, "Mengerti")
  }));
}
Object.assign(window, {
  Mapel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Mapel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Onboarding.jsx
try { (() => {
const {
  Button,
  Badge
} = window.LanjutDesignSystem_e1bf29;
const SLIDES = [{
  eyebrow: 'Kelas 12',
  title: 'Kuliah itu jalur, bukan lompatan.',
  body: 'Lanjut merapikan semua tanggal penting jadi satu linimasa yang bisa kamu ikuti pelan-pelan.'
}, {
  eyebrow: 'TKA · SNBP · SNBT',
  title: 'Tahu apa yang harus disiapkan, kapan.',
  body: 'Setiap jalur punya syarat dan tanggalnya sendiri. Kami tandai mana yang sudah lewat dan mana yang segera.'
}, {
  eyebrow: 'Pilih mapel',
  title: 'Mapel yang tepat bikin peluangmu lebih besar.',
  body: 'Pilih dua mapel pilihan yang cocok dengan program studi yang kamu incar.'
}];
function Onboarding({
  onDone
}) {
  const [i, setI] = React.useState(0);
  const s = SLIDES[i];
  const last = i === SLIDES.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--gradient-cover)',
      color: 'var(--white)',
      padding: '28px var(--gutter-screen) 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/lanjut-wordmark-standalone.png",
    alt: "Lanjut",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      background: 'none',
      border: 0,
      color: 'rgba(255,255,255,.9)',
      font: 'var(--text-body-small)',
      cursor: 'pointer'
    }
  }, "Lewati")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mascot/mascot-white.png",
    alt: "",
    style: {
      width: 170
    }
  })), /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      animation: 'slidein var(--dur-slow) var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark",
    style: {
      alignSelf: 'flex-start'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--text-h2)',
      color: 'var(--white)'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-default)',
      color: 'rgba(255,255,255,.88)'
    }
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      margin: '20px 0 16px'
    }
  }, SLIDES.map((_, n) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      height: 6,
      flex: n === i ? 2 : 1,
      borderRadius: 3,
      background: n === i ? 'var(--white)' : 'rgba(255,255,255,.4)',
      transition: 'flex var(--dur-base) var(--ease-standard)'
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    variant: "secondary",
    onClick: () => last ? onDone() : setI(i + 1)
  }, last ? 'Mulai sekarang' : 'Lanjut'), /*#__PURE__*/React.createElement("style", null, '@keyframes slidein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}'));
}
Object.assign(window, {
  Onboarding
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Profil.jsx
try { (() => {
const {
  AppBar,
  Card,
  Field,
  Input,
  Select,
  Switch,
  Checkbox,
  Button,
  ProgressBar
} = window.LanjutDesignSystem_e1bf29;
function Profil() {
  const [remind, setRemind] = React.useState(true);
  const [offline, setOffline] = React.useState(false);
  const [items, setItems] = React.useState({
    akun: true,
    pdss: true,
    rapor: false,
    essay: false
  });
  const done = Object.values(items).filter(Boolean).length;
  const set = k => setItems(s => ({
    ...s,
    [k]: !s[k]
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Profil"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--gutter-screen)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--blue-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--text-h3)',
      color: 'var(--blue-600)'
    }
  }, "RA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-title)'
    }
  }, "Rani Amelia"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-small)',
      color: 'var(--text-muted)'
    }
  }, "SMKN 4 Bandung \xB7 RPL \xB7 Lulus 2027"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nama lengkap"
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Rani Amelia"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Jurusan",
    hint: "Sesuai jurusan di rapor"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['RPL', 'TKJ', 'Akuntansi', 'Multimedia'],
    defaultValue: "RPL"
  }))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: done,
    max: 4,
    label: "Checklist persiapan",
    showValue: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: items.akun,
    onChange: () => set('akun'),
    label: "Akun SNPMB sudah dibuat"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: items.pdss,
    onChange: () => set('pdss'),
    label: "Nilai rapor masuk PDSS"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: items.rapor,
    onChange: () => set('rapor'),
    label: "Sertifikat prestasi diunggah"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: items.essay,
    onChange: () => set('essay'),
    label: "Portofolio disiapkan"
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: remind,
    onChange: () => setRemind(!remind),
    label: "Pengingat H-7 tiap tenggat"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: offline,
    onChange: () => setOffline(!offline),
    label: "Simpan linimasa untuk offline"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true
  }, "Keluar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '8px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-subtle)'
    }
  }, "Dibuat oleh"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/edilakso-wordmark.png",
    alt: "edilakso",
    style: {
      height: 22,
      opacity: .7
    }
  }))));
}
Object.assign(window, {
  Profil
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Profil.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lanjut-pwa/Splash.jsx
try { (() => {
function Glyph({
  d,
  size = 22
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
function Splash({
  onSkip
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onSkip,
    style: {
      flex: 1,
      background: 'var(--gradient-cover)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-6)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mascot/mascot-white.png",
    alt: "",
    style: {
      width: 190,
      animation: 'rise var(--dur-page) var(--ease-out-soft)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/lanjut-wordmark-standalone.png",
    alt: "Lanjut",
    style: {
      width: 220
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-small)',
      color: 'rgba(255,255,255,.9)',
      letterSpacing: '.01em'
    }
  }, "Navigasi jalur kuliah untuk siswa SMK"), /*#__PURE__*/React.createElement("style", null, '@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}'));
}
Object.assign(window, {
  Glyph,
  Splash
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lanjut-pwa/Splash.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CoverPanel = __ds_scope.CoverPanel;

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.TimelineStep = __ds_scope.TimelineStep;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AppBar = __ds_scope.AppBar;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
