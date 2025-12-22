export interface SignInFormData {
  username: string
  password: string
}

export interface SignUpStep1Data {
  nom: string
  prenom: string
  telephone: string
}

export interface SignUpStep2Data {
  email: string
  username: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface SignUpFormData extends SignUpStep1Data, SignUpStep2Data {}

export interface ConfirmationCodeData {
  code: string[]
}
