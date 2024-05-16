export function convertStringsToUppercase(obj: any): any {
    if (obj !== null && typeof obj === "object") {
        // Percorre todas as propriedades do objeto
        Object.keys(obj).forEach((key) => {
            // Verifica se o valor da propriedade é uma string
            if (typeof obj[key] === "string") {
                // Converte a string para maiúsculas
                obj[key] = obj[key].toUpperCase();
            } else if (typeof obj[key] === "object") {
                // Se o valor da propriedade for um objeto, chama a função recursivamente
                obj[key] = convertStringsToUppercase(obj[key]);
            }
        });
    }
    return obj;
}