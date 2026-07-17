export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

export function isDataNascimentoValida(s: string): boolean {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s)
  if (!m) return false
  const dia = Number(m[1])
  const mes = Number(m[2])
  const ano = Number(m[3])
  const anoAtual = new Date().getFullYear()
  if (mes < 1 || mes > 12) return false
  if (dia < 1 || dia > 31) return false
  if (ano < 1900 || ano > anoAtual) return false
  const d = new Date(ano, mes - 1, dia)
  if (
    d.getFullYear() !== ano ||
    d.getMonth() !== mes - 1 ||
    d.getDate() !== dia
  ) return false
  if (d.getTime() > Date.now()) return false
  return true
}
