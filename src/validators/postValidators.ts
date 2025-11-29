import { required, minLength, maxLength } from "react-admin";

export const titleValidators = [
  required("Der Titel ist erforderlich."),
  minLength("Der Titel muss mindestens 3 Zeichen lang sein."),
  maxLength("Der Titel darf maximal 100 Zeichen lang sein."),
  (value: string) => {
    if (!value) return undefined;

    // Leerzeichen am Anfang und am Ende werden gelöscht.
    if (value.trim() !== value) {
      return "Der Titel darf nicht mit Leerzeichen beginnen oder enden";
    }

    // Keine Titel mit nur Sonderzeichen
    if (/^[^a-zA-Z0-9äöüÄÖÜß]+$/.test(value)) {
      return "Der Titel muss mindestens ein Buchstaben- oder Zahlenzeichen enthalten.";
    }
    return undefined;
  },
];

export const bodyValidators = [
    required("Der Inhalt ist erforderlich."),
    minLength(10, "Der Inhalt muss mindestens 10 Zeichen lang sein."),
    maxLength(5000, "Der Inhalt darf nicht länger als 5000 Zeichen lang sein.")
]