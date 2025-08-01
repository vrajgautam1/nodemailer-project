function generateOTP(){
    const randomNumberOTP = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
    )
    return randomNumberOTP
}

module.exports = generateOTP