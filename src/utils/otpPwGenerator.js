function generateOTP(){
    const randomNumberOTP = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
    )
    return randomNumberOTP
}

function generatePassword(){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$"
  let password = ""
  for(let i = 0; i<8; i++){
    let index = Math.floor(Math.random() * chars.length)
    password += chars[index]
  }
  return password
}

module.exports = {generateOTP, generatePassword}