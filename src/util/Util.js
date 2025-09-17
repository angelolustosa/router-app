// Função para aplicar a máscara
export const formatTelefone = (value) => {
  // Remove tudo que não for número
  let v = value.replace(/\D/g, "");

  if (v.length > 11) v = v.slice(0, 11); // limita a 11 dígitos

  if (v.length <= 10) {
    // Formato fixo: (99) 9999-9999
    return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else {
    // Formato celular: (99) 99999-9999
    return v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
  }
};