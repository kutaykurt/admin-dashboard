import { required, minLength, maxLength, email } from "react-admin";

export const nameValidators = [
  required("Name ist erforderlich."),
  minLength(3, "Der Name muss mindestens 3 zeichen lang sein."),
  maxLength(150, "Name darf nicht länger als 150 Zeichen sein."),
];

export const emailValidators = [
  required("Email ist erforderlich."),
  email("Bitte eine gültige E-Mail Adresse eingeben."),
];

export const usernameValidators = [
  required("Benutzername ist erforderlich."),
  minLength(3, "Der Benutzername muss mindestens 3 Zeichen lang sein."),
  maxLength(50, "Benutzername darf nicht länger als 50 Zeichen sein."),
];
