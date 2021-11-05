module.exports = {
    important: true,
    purge: { content: ["./pages/**/*.tsx", "./components/**/*.tsx"] },
    darkMode: false,
    theme: {
        extend: {
            fontFamily: {
                Rubik: ["Rubik", "ui-sans-serif", "system-ui"],
            },
            backgroundColor: (theme) => ({
                ...theme("colors"),
                lightGreen: "#b5ffa3",
            }),
            boxShadow: {
                dropdown: "0px 9px 17px 2px rgba(48, 69, 84, 0.2);",
            },
            maxWidth: {
                button: "150px",
                60: "60%",
                90: "90%",
            },
            maxHeight: {
                "4/5": "80%",
            },
            minHeight: {
                12: "3rem",
            },
            minWidth: {
                5: "1.25rem",
                16: "17rem",
                36: "9rem",
            },
        },
    },
    variants: {
        extend: {
            borderWidth: ["first"],
            backgroundColor: ["checked"],
            borderColor: ["checked"],
            inset: ["checked"],
            zIndex: ["hover", "active"],
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
