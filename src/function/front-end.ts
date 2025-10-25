export const SCSS = `
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap");

:root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #21262d;
    --bg-overlay: rgba(22, 27, 34, 0.8);
    --bg-glass: rgba(22, 27, 34, 0.6);

    --text-primary: #f0f6fc;
    --text-secondary: #8b949e;
    --text-muted: #6e7681;

    --border-primary: #30363d;
    --border-secondary: rgba(48, 54, 61, 0.5);
    --border-accent: rgba(88, 166, 255, 0.3);

    --accent-blue: #58a6ff;
    --accent-blue-bright: #79c0ff;
    --accent-green: #3fb950;
    --accent-orange: #ffa657;
    --accent-red: #f85149;
    --accent-purple: #a5a5ff;

    --get-color: #61affe;
    --post-color: #49cc90;
    --put-color: #fca130;
    --delete-color: #f93e3e;
    --patch-color: #9333ea;
    --options-color: #0d7377;
    --head-color: #9013fe;

    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.3);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.4);

    --gradient-primary: linear-gradient(135deg, #0a0e16 0%, #0d1117 50%, #161b22 100%);
    --gradient-secondary: linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%);
    --gradient-accent: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b);

    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.swagger-ui {
    will-change: transform;
    transform: translateZ(0);
    contain: layout style paint;
}

.swagger-ui .top-bar {
    display: none;
}

.swagger-ui {
    background: var(--gradient-primary) !important;
    color: var(--text-primary) !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.swagger-ui .info {
    margin: 30px 0 40px 0;
    padding: 30px;
    background: var(--gradient-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 20px;
    color: var(--text-primary);
    box-shadow:
        var(--shadow-lg),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    &:focus-within {
        outline: 2px solid var(--accent-blue);
        outline-offset: 2px;
    }
}

.swagger-ui .info .title small {
    -webkit-text-fill-color: initial !important;
    background: var(--accent-blue) !important;
    color: var(--text-primary) !important;
    padding: 6px 12px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    margin-left: 12px !important;
    box-shadow: var(--shadow-sm) !important;
}

.swagger-ui .info .title small:last-child {
    background: var(--accent-green) !important;
}

.swagger-ui .info::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-accent);
    border-radius: 20px 20px 0 0;
}

.swagger-ui .info .title {
    color: var(--text-primary) !important;
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 15px;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.swagger-ui .info .description {
    color: var(--text-secondary);
    font-size: 1.15rem;
    margin: 20px 0;
    line-height: 1.7;
    max-width: 70ch;
}

.swagger-ui .opblock {
    background: var(--bg-overlay) !important;
    border: 1px solid var(--border-secondary) !important;
    border-radius: 16px;
    margin-bottom: 24px;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: var(--transition-smooth);
    backdrop-filter: blur(12px);
    position: relative;
    will-change: transform, box-shadow;
    isolation: isolate;
}

.swagger-ui .opblock::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    z-index: 1;
}

.swagger-ui .opblock:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-2px) scale(1.002);
    border-color: var(--border-accent) !important;
    background: rgba(22, 27, 34, 0.95) !important;
}

.swagger-ui .opblock:focus-within {
    outline: 2px solid var(--accent-blue);
    outline-offset: 2px;
}

.swagger-ui .opblock.opblock-get {
    border-left: 4px solid var(--get-color) !important;
    background: linear-gradient(135deg, rgba(97, 175, 254, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-post {
    border-left: 4px solid var(--post-color) !important;
    background: linear-gradient(135deg, rgba(73, 204, 144, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-put {
    border-left: 4px solid var(--put-color) !important;
    background: linear-gradient(135deg, rgba(252, 161, 48, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-delete {
    border-left: 4px solid var(--delete-color) !important;
    background: linear-gradient(135deg, rgba(249, 62, 62, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-patch {
    border-left: 4px solid var(--patch-color) !important;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-options {
    border-left: 4px solid var(--options-color) !important;
    background: linear-gradient(135deg, rgba(13, 115, 119, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock.opblock-head {
    border-left: 4px solid var(--head-color) !important;
    background: linear-gradient(135deg, rgba(144, 19, 254, 0.12) 0%, var(--bg-overlay) 30%) !important;
}

.swagger-ui .opblock-summary-method {
    border-radius: 8px !important;
    font-weight: 700 !important;
    font-size: 0.75rem !important;
    padding: 8px 14px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    box-shadow: var(--shadow-sm) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
}

.swagger-ui .opblock .opblock-summary {
    color: var(--text-primary) !important;
    padding: 18px 24px !important;
    font-weight: 600;
    font-size: 1.05rem;
    min-height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.swagger-ui .opblock-description-wrapper,
.swagger-ui .opblock-external-docs-wrapper,
.swagger-ui .opblock-title_normal {
    color: var(--text-secondary) !important;
}

.swagger-ui .btn {
    border-radius: 12px;
    font-weight: 600;
    transition: var(--transition-smooth);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.85rem;
    position: relative;
    overflow: hidden;
    min-height: 44px;
    &:focus {
        outline: 2px solid var(--accent-blue);
        outline-offset: 2px;
    }
}

.swagger-ui .btn.execute {
    background: linear-gradient(135deg, var(--accent-green) 0%, #2ea043 100%) !important;
    border: none !important;
    color: white !important;
    padding: 14px 28px;
    box-shadow: 0 4px 12px rgba(63, 185, 80, 0.3);
    &[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.swagger-ui .btn.execute::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.swagger-ui .btn.execute:hover:not([disabled]) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(63, 185, 80, 0.4) !important;
    background: linear-gradient(135deg, #46d164 0%, var(--accent-green) 100%) !important;
}

.swagger-ui .btn.execute:hover:not([disabled])::before {
    left: 100%;
}

.swagger-ui .parameters-col_description,
.swagger-ui .parameter__name,
.swagger-ui .parameter__type {
    color: var(--text-secondary) !important;
}

.swagger-ui .parameter__name.required {
    color: var(--accent-red) !important;
    font-weight: 600 !important;
}

.swagger-ui .parameter__name.required::after {
    content: " *";
    color: var(--accent-red);
    font-weight: bold;
    speak: literal-punctuation;
}

.swagger-ui .parameters-col_name,
.swagger-ui .parameters-col_description {
    background: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
}

.swagger-ui .parameter__name {
    color: var(--text-primary) !important;
}

.swagger-ui .parameter__type {
    color: var(--accent-blue) !important;
}

.swagger-ui .parameter__deprecated {
    color: var(--accent-orange) !important;
}

.swagger-ui .parameters thead tr th {
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    border-bottom: 2px solid var(--border-primary) !important;
}

.swagger-ui .responses-inner {
    border-radius: 16px;
    overflow: hidden;
    background: var(--bg-secondary) !important;
    border: 1px solid var(--border-secondary) !important;
    backdrop-filter: blur(8px);
}

.swagger-ui .response-col_status {
    font-weight: 700;
    color: var(--text-primary) !important;
    padding: 16px !important;
    background: var(--bg-primary) !important;
    font-family: "JetBrains Mono", "Fira Code", Monaco, monospace;
}

.swagger-ui .response-col_description {
    background: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
}

.swagger-ui .responses-table thead tr th {
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    border-bottom: 2px solid var(--border-primary) !important;
}

.swagger-ui .responses-table tbody tr td {
    background: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-primary) !important;
}

.swagger-ui .highlight-code {
    border-radius: 16px;
    background: var(--bg-primary) !important;
    border: 1px solid var(--border-primary) !important;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.5;
}

.swagger-ui .highlight-code::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 24px;
    background: linear-gradient(180deg, rgba(48, 54, 61, 0.3) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
}

.swagger-ui .microlight {
    color: var(--text-primary) !important;
    font-family: "JetBrains Mono", "Fira Code", "SF Mono", Monaco, monospace !important;
    font-size: 0.9rem;
    white-space: pre-wrap;
    word-break: break-word;
}

.swagger-ui .model-box {
    border-radius: 16px;
    background: var(--bg-glass) !important;
    border: 1px solid var(--border-secondary) !important;
    color: var(--text-primary) !important;
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-md);
    padding: 20px;
}

.swagger-ui .model-title {
    color: var(--text-primary) !important;
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 12px;
}

.swagger-ui .prop-type {
    color: var(--accent-blue-bright) !important;
    font-weight: 600;
    font-family: "JetBrains Mono", "Fira Code", Monaco, monospace;
}

.swagger-ui .prop-format {
    color: var(--text-secondary) !important;
    font-style: italic;
    font-size: 0.9rem;
}

.swagger-ui input[type="text"],
.swagger-ui input[type="password"],
.swagger-ui input[type="email"],
.swagger-ui input[type="number"],
.swagger-ui textarea,
.swagger-ui select {
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    border: 2px solid var(--border-primary) !important;
    border-radius: 10px;
    padding: 14px 18px;
    transition: var(--transition-smooth);
    font-size: 1rem;
    backdrop-filter: blur(8px);
    line-height: 1.5;
    min-height: 44px;
}

.swagger-ui input[type="text"]:focus,
.swagger-ui input[type="password"]:focus,
.swagger-ui input[type="email"]:focus,
.swagger-ui input[type="number"]:focus,
.swagger-ui textarea:focus,
.swagger-ui select:focus {
    border-color: var(--accent-blue) !important;
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.3) !important;
    outline: none !important;
    background: var(--bg-secondary) !important;
    transform: scale(1.01);
}

.swagger-ui .parameters-col_description input,
.swagger-ui .parameter__name input,
.swagger-ui input {
    border: 2px solid var(--border-primary) !important;
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
}

.swagger-ui .parameters-col_description input:focus,
.swagger-ui .parameter__name input:focus,
.swagger-ui input:focus {
    border-color: var(--accent-blue) !important;
    background: var(--bg-secondary) !important;
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.3) !important;
}

.swagger-ui input::placeholder,
.swagger-ui textarea::placeholder {
    color: var(--text-muted) !important;
    opacity: 0.8;
}

.swagger-ui .filter .operation-filter-input {
    background: var(--bg-overlay) !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-primary) !important;
    border-radius: 16px;
    padding: 18px 24px;
    font-size: 1.05rem;
    transition: var(--transition-smooth);
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-md);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2'%3e%3ccircle cx='11' cy='11' r='8'/%3e%3cpath d='M21 21l-4.35-4.35'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 20px;
    padding-right: 50px;
}

.swagger-ui .filter .operation-filter-input::placeholder {
    color: var(--text-muted) !important;
}

.swagger-ui .filter .operation-filter-input:focus {
    outline: none;
    border-color: var(--accent-blue) !important;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2) !important;
    background-color: rgba(22, 27, 34, 0.95) !important;
    transform: scale(1.02);
}

.swagger-ui .auth-container {
    background: var(--bg-overlay) !important;
    border: 1px solid var(--border-secondary) !important;
    border-radius: 20px;
    padding: 28px;
    margin: 28px 0;
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-lg);
}

.swagger-ui ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

.swagger-ui ::-webkit-scrollbar-track {
    background: rgba(22, 27, 34, 0.5);
    border-radius: 8px;
}

.swagger-ui ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #484f58, #6e7681);
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
    transition: background 0.2s ease;
}

.swagger-ui ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #656c76, #8b949e);
}

.swagger-ui ::-webkit-scrollbar-corner {
    background: rgba(22, 27, 34, 0.5);
}

.swagger-ui table {
    background: var(--bg-glass) !important;
    border: 1px solid var(--border-secondary) !important;
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-md);
    border-spacing: 0;
}

.swagger-ui table th,
.swagger-ui table td {
    border: 1px solid rgba(48, 54, 61, 0.3) !important;
    color: var(--text-primary) !important;
    padding: 16px !important;
    text-align: left;
}

.swagger-ui table thead tr th {
    background: rgba(33, 38, 45, 0.8) !important;
    color: var(--text-primary) !important;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    position: sticky;
    top: 0;
    z-index: 10;
}

.swagger-ui a {
    color: var(--accent-blue) !important;
    transition: color 0.2s ease;
    text-decoration: none;
    &:focus {
        outline: 2px solid var(--accent-blue);
        outline-offset: 2px;
        border-radius: 4px;
    }
}

.swagger-ui a:hover {
    color: var(--accent-blue-bright) !important;
    text-decoration: underline;
    text-underline-offset: 3px;
}

.swagger-ui .opblock-tag {
    color: var(--text-primary) !important;
    border-bottom: 2px solid var(--border-secondary) !important;
    font-size: clamp(1.25rem, 3vw, 1.5rem) !important;
    font-weight: 700 !important;
    padding: 24px 0 !important;
    margin-bottom: 28px !important;
    position: relative;
    letter-spacing: -0.01em;
}

.swagger-ui .opblock-tag::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-blue), var(--accent-blue-bright));
    border-radius: 2px;
}

.swagger-ui .loading-container {
    background: var(--bg-overlay) !important;
    border-radius: 16px;
    backdrop-filter: blur(12px);
    &::after {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        margin: 20px auto;
        border: 3px solid rgba(88, 166, 255, 0.3);
        border-top: 3px solid var(--accent-blue);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

.swagger-ui .error-wrapper {
    background: rgba(248, 81, 73, 0.1) !important;
    border: 1px solid rgba(248, 81, 73, 0.3) !important;
    border-radius: 16px;
    backdrop-filter: blur(8px);
    color: #ffa8a8;
    padding: 16px 20px;
}

.swagger-ui .success {
    background: rgba(73, 204, 144, 0.1) !important;
    border: 1px solid rgba(73, 204, 144, 0.3) !important;
    border-radius: 16px;
    color: #a8f5a8;
    padding: 16px 20px;
}

.swagger-ui .opblock-section-header {
    background: var(--background-secondary) !important;
    color: var(--text-primary) !important;
    font-weight: 600 !important;
    border-bottom: 1px solid var(--border-color) !important;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.swagger-ui .opblock {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@media (prefers-color-scheme: dark) {
    .swagger-ui {
    }
}

@media (prefers-contrast: high) {
    :root {
        --border-primary: #ffffff;
        --text-secondary: #ffffff;
    }
}

@media (prefers-reduced-motion: reduce) {
    .swagger-ui * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

@media (max-width: 768px) {
    .swagger-ui .info .title {
        font-size: clamp(1.8rem, 6vw, 2.2rem);
    }

    .swagger-ui .opblock {
        margin-bottom: 16px;
        border-radius: 12px;
    }

    .swagger-ui .info {
        margin: 16px 0 24px 0;
        padding: 20px;
        border-radius: 16px;
    }

    .swagger-ui .btn.execute {
        padding: 12px 20px;
        font-size: 0.8rem;
        width: 100%;
    }

    .swagger-ui .opblock-summary {
        padding: 20px !important;
        min-height: 48px;
    }

    .swagger-ui .filter .operation-filter-input {
        padding: 16px 20px;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .swagger-ui .info {
        padding: 16px;
        margin: 12px;
    }

    .swagger-ui .info .title {
        font-size: clamp(1.5rem, 8vw, 1.8rem);
    }

    .swagger-ui .opblock {
        border-radius: 12px;
        margin: 12px;
    }

    .swagger-ui .opblock-summary {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .swagger-ui .opblock-summary-method {
        align-self: flex-start;
    }
}

@media print {
    .swagger-ui {
        background: white !important;
        color: black !important;
        box-shadow: none !important;
    }

    .swagger-ui .opblock {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        break-inside: avoid;
    }

    .swagger-ui .btn {
        display: none;
    }
}`

export const Email = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fillxo Verification Code</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; font-family: 'Comfortaa', sans-serif;">
                                fillxo
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; font-family: 'Comfortaa', sans-serif;">
                                Verification Code
                            </h2>
                            
                            <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.6; font-family: 'Comfortaa', sans-serif;">
                                Use the following code to complete your verification. This code will expire in <strong style="color: #1a1a1a;">10 minutes</strong>.
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 24px 0;">
                                        <div style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); border-radius: 12px; padding: 4px; display: inline-block;">
                                            <div style="background-color: #ffffff; border-radius: 10px; padding: 20px 48px;">
                                                <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #3b82f6; font-family: 'Courier New', monospace;">
                                                    ${otp}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 32px 0 0; color: #999999; font-size: 14px; line-height: 1.6; font-family: 'Comfortaa', sans-serif;">
                                If you didn't request this code, please ignore this email or contact support if you have concerns.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #999999; font-size: 13px; text-align: center; line-height: 1.5; font-family: 'Comfortaa', sans-serif;">
                                © ${new Date().getFullYear()} fillxo. All rights reserved.
                            </p>
                            <p style="margin: 8px 0 0; color: #999999; font-size: 13px; text-align: center; font-family: 'Comfortaa', sans-serif;">
                                This is an automated message, please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
