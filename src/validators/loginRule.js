const loginRule = {
    user_name: {
        presence: { 
            message: 'Hãy nhập Tên đăng nhập',
            allowEmpty: false,
        },
        length: {
          minimum: 4,
          maximum :50,
          tooLong:"Tên đăng nhập không được quá %{count} từ",
          tooShort:"Tên đăng nhập không được ít hơn %{count} từ"
        }
    },
    
    password: {
      presence: {
        message: 'Hãy nhập Mật khẩu',
        allowEmpty: false
      },
      length: {
        minimum: 4,
        maximum :16,
        tooLong:"Password không được quá %{count} từ",
        tooShort:"Password không được ít hơn %{count} từ"
      }
    }
  }

export default loginRule;