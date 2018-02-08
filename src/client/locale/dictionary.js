export const dictionary = {
  en: {
    header: {
      loginBtnLabel: "Login",
      logoutBtnLabel: "Logout"
    },
    main: {
      createWalletBtnLabel: "Create New Wallet",
      restoreWalletBtnLabel: "Restore My Wallet",
      backToWalletBtn: "Back To My Wallet"
    },
    requestErrorModal: {
      title: "The explorer could not return data correctly. Reset explorer or retry.",
      resetBtn: "Reset",
      retryBtn: "Retry"
    },
    newTransactionsModal: {
      title: "transations have been confirmed.",
      okBtn: "ok"
    },
    navPanel: {
      wallet: "My Wallet",
      assetsDetails: "Assets Details",
      securityCenter: "Security Center",
      faq: "F&Q",
      search: "Search..."
    },
    assetsDetails: {
      amountLabel: "Amount:",
      pendingLabel: "Pending:",
      allTabLabel: "All",
      sendTabLabel: "Send",
      receivedTabLabel: "Received",
      sendLabel: "Send",
      receivedLabel: "Received",
      fromLabel: "From:",
      toLabel: "To:",
      descLabel: "Description:",
      myWalletLabel: "My Wallet",
      startDatePlaceholderText: "Start Date",
      endDatePlaceholderText: "End Date"
    },
    mainPage: {
      sendBtn: "Send",
      importMoreBtn: "Import more",
      receiveBtn: "Receive",
      recentTitle: "Recent"
    },
    confirmCloseModal: {
      mainTitle: "Make sure you have saved your wallet file and mnemonics properly, or you will lose this wallet FOREVER.",
      secureCenterBtn1: "Go to security center",
      secureCenterBtn2: "to BACKUP",
      logoutBtn: "OK, Log out",
      exitBtn: "OK, Close",
      dontShowBox: "Don’t show this again"
    },
    securityCenter: {
      pageHeading: "PLEASE DON'T TOUCH ANYTHING UNLESS YOU REALLY UNDERSTAND WHAT YOU ARE DOING",
      panelHeading: "Backup",
      panelSubHeading: "Input your password to backup",
      displayBtn: "Display mnemonics",
      downloadBackupBtn: "Download wallet file",
      firstDescription: "You can get the backup of your mnemonics or wallet file here. It just like COPY YOU WALLET FILE, or TRANSCRIBE YOUR MNEMONICS.",
      secondDescription: "Each backup is COMPLETELY SAME with the one you use to restore your wallet, and can be used to make your asset avaliable INDEPENDENTLY.",
      thirdDescription: "You SHOULD NEVER share any backup with others. You should only backup for YOURSELF, and only on reliable devices, in safe situation.",
      forthDescription: "MAKE SURE you know what you are doing before action.",
      errorModal: {
        title: "Password is incorrect",
        doneBtn: "Done"
      },
      explorerContainer: {
        title: "Explorer Settings",
        desc: "You can choose qtum explorer or ink explorer to get transation datas.You can also set the explorer you prefer.",
        customRadioLabel: "Custom",
        customPathInputPlaceholder: "Please input an explorer address",
        submitBtn: "Submit"
      },
      mnemonicsModal: {
        title: "Your mnemonics is",
        firstDescription: "Make sure you have saved your wallet file and mnemonics properly, or you will lose this wallet FOREVER.",
        secondDescription: "We strongly suggest you write down this words in a paper and lock it in the proper place cannot be forgot.",
        thirdDescription: "Save them in you computer would be convience, but if your hard-disk is dead you could lose all your assets."
      }
    },
    loginPage: {
      title: "Login",
      uploadFileBtn: "Upload My Wallet File",
      uploadFileBtnUploaded: "Upload success",
      inputPasswordLabel: "Please input your password",
      confirmBtn: "Confirm",
      restoreLink: "Restore by mnemonics",
      errors: {
        loginError: "Invalid file or password"
      },
      restoreDescLabel: "Click link above if you don't have wallet file, forgot PIN, log in on not frequently used device"
    },
    createWallet: {
      errors: {
        notMatch: "Passwords doesn't match.",
        notEntered: "No passwords entered.",
        shortPassword: "Password must be longer than 6 characters."
      },
      title: "Create New Wallet",
      setPassword: "Set your password:",
      confirmPassword: "Confirm your password:",
      passwordInfo1: "Password used to unlock your wallet file.",
      passwordInfo2: "You will be asked to input it when you log in and make transfers.",
      agree: "I have read and agree Term of usage for INK wallet",
      passwordNextBtn: "Next",
      goToMainPageBtn: "Back to main page",
      showAddressTitle: "Your wallet address",
      showAddressDescr: "Wallet address is the identity of your wallet." +
      "You can tell it to others.  For yourself, Mnenonics and Wallet" +
      "File are the keys to your wallet. Wallet File is used to log in" +
      "your wallet, and Mnemonics is used to restore your wallet in other" +
      "devices.So you should hold both of them. Stressly, Ink will not save mnenonics or" +
      "wallet file.Do Remember Your Mnenonics and Wallet Files and don't share them with anyone",
      showAddressNextBtn: "Understand,\n get my Mnemonics and Wallet Files",
      showMnemonicTitle: "Your Mnemonics",
      showMnemonicDescr: "Once more, Wallet File is used to log in your wallet," +
      "and Mnemonics is used to restore your wallet in other devices." +
      "Anyone who get the mnenonics or wallet file can get in your wallet." +
      "You MUST write down your mnenonics," +
      "download your wallet file and save them carefully and safely." +
      "You CAN NOT re-get your wallet if you lose both of them." +
      "Do Remember Your Mnenonics and Wallet File and don't share them with anyone.",
      showMnemonicNextBtn: "Understand and get started",
      showMnemonicDownloadBtn: "Download your Wallet File"
    },
    sendTransaction: {
      modalTitle: "Send",
      prepareForm: {
        token: "Token",
        availableAmount: "Available amount:",
        amountPlaceholder: "Input address",
        to: "To",
        amount: "Amount",
        description: "Description",
        fee: {
          label: "Fees",
          custom: "Custom",
          standart: "Standart",
          slow: "Slow",
          quick: "quick"
        },
        confirmBtn: "Confirm",
        errors: {
          emptyAddress: "Address field is empty",
          emptyAmount: "Amount field is empty",
          invalidAmount: "Amount is invalid",
          invalidAddress: "Address is invalid",
          dustAmount: "The amount is too small",
          amountLow: "Amount to send more than your balance"
        }
      },
      confirmForm: {
        token: "Token:",
        to: "To:",
        amount: "Amount:",
        description: "Description:",
        fees: "Fees:",
        inputPassword: "Input password",
        errors: {
          passwordIsIncorrect: "Incorrect password",
          passwordIsEmpty: "Password field is empty"
        },
        confirmBtn: "Confirm"
      },
      successForm: {
        succeed: "Succeed",
        doneBtn: "Done"
      }
    },
    receive: {
      modalTitle: "Receive",
      qrDescription: "Scan the QR code or copy and share your wallet address to receive tokens in your wallet.",
      addressLabel: "Your wallet address",
      copyBtn: "Copy address"
    },
    restoreWallet: {
      title: "Restore",
      inputYourMnemonics: "Please input your mnemonics",
      errors: {
        invalid: "Invalid mnemonic",
        notEntered: "No mnemonics entered"
      },
      passwordInfo: "This password is for your NEW wallet file only." +
      " You can just use it once or download it for later." +
      "You old wallet file is still valid and its password is NOT be changed.",
      resetPassword: "Reset your password:",
      resetPassword2: "Confirm your password:",
      restoreSuccessTitle: "Successed!",
      restoreInfo: {
        info1: "If you only use this wallet file & password one-off, please DO NOT\n" +
        "download it. If so, your new password will not be saved after you loging out.",
        info2: "Aware the old wallet file is still valid and its password is not changed.",
        info3: "OLD password for OLD waller file, NEW password for the new one.\n" +
        "You can delete the old wallet file to aviod confusion"
      }
    }
  },
  zh: {
    header: {
      loginBtnLabel: "登录",
      logoutBtnLabel: "注销"
    },
    main: {
      createWalletBtnLabel: "创建新钱包",
      restoreWalletBtnLabel: "载入钱包",
      backToWalletBtn: "Back To My Wallet"
    },
    requestErrorModal: {
      title: "浏览器无法正确返回交易数据。请重设浏览器或重试。",
      resetBtn: "重设浏览器",
      retryBtn: "重试"
    },
    newTransactionsModal: {
      title: "个交易已经被确认。",
      okBtn: "好的"
    },
    navPanel: {
      wallet: "我的钱包",
      assetsDetails: "资产详情",
      securityCenter: "安全中心",
      faq: "常见问题",
      search: "搜索..."
    },
    assetsDetails: {
      amountLabel: "可用余额：",
      pendingLabel: "等待中：",
      allTabLabel: "全部",
      sendTabLabel: "已发送",
      receivedTabLabel: "已接收",
      sendLabel: "已发送",
      receivedLabel: "已接收",
      fromLabel: "从:",
      toLabel: "到:",
      descLabel: "交易描述:",
      myWalletLabel: "我的钱包",
      startDatePlaceholderText: "入住日期",
      endDatePlaceholderText: "退房日期"
    },
    mainPage: {
      sendBtn: "发送",
      importMoreBtn: "导入更多",
      receiveBtn: "接收",
      recentTitle: "最近交易"
    },
    confirmCloseModal: {
      mainTitle: "您应该合理地保存了钱包文件和记忆词，否则您将永远丢失您的钱包。",
      secureCenterBtn1: "",
      secureCenterBtn2: "去备份",
      logoutBtn: "确认退出",
      exitBtn: "OK, Close",
      dontShowBox: "以后不再提示"
    },
    securityCenter: {
      pageHeading: "如果您不了解本页内容，请不要在此做任何操作。",
      panelHeading: "备份钱包",
      panelSubHeading: "请输入钱包密码",
      displayBtn: "查看助记词",
      downloadBackupBtn: "下载钱包文件",
      firstDescription: "你可以备份你的记忆词或钱包文件，这与复制钱包文件，或重抄助记词的效果完全相同。",
      secondDescription: "备份的钱包文件与您现在使用的完全相同，它们都可以被独立地使用，以访问您的钱包。",
      thirdDescription: "他人共享备份文件会导致资金危险。您应该只在可信设备上和安全环境中备份钱包。",
      forthDescription: "确认您理解备份操作的意义，否则请停止备份。",
      errorModal: {
        title: "密码错误！",
        doneBtn: "完成"
      },
      explorerContainer: {
        title: "浏览器设置",
        desc: "您可以选择从Qtum浏览器或INK浏览器获取交易信息。您也可以设置您自己偏好的浏览器。",
        customRadioLabel: "自定义",
        customPathInputPlaceholder: "请输入一个有效的浏览器地址",
        submitBtn: "提交"
      },
      mnemonicsModal: {
        title: "您的记忆词如下：",
        firstDescription: "您应该合理地保存了钱包文件和记忆词，否则您将永远丢失您的钱包。",
        secondDescription: "我们强烈建议您在纸上抄下您的助记词，并将它放在安全、不会被遗忘的地方。",
        thirdDescription: "把记忆词保存在电脑上很方便，但如果您的硬盘出现问题，您将会失去您的钱包。"
      }
    },
    loginPage: {
      title: "登录",
      uploadFileBtn: "加载钱包文件",
      uploadFileBtnUploaded: "Upload success",
      inputPasswordLabel: "请输入密码",
      confirmBtn: "确认",
      restoreLink: "用记忆词恢复钱包",
      errors: {
        loginError: "密码不正确。"
      },
      restoreDescLabel: "适用于没有钱包文件、忘记密码或在不常用设备上登录"
    },
    createWallet: {
      errors: {
        notMatch: "两次输入的密码不匹配。",
        notEntered: "密码不能少于六位。",
        shortPassword: "密码不能少于六位。"
      },
      title: "创建新钱包",
      setPassword: "设置密码:",
      confirmPassword: "确认密码:",
      passwordInfo1: "密码将为钱包文件加密。",
      passwordInfo2: "在载入钱包/发起交易时，您需要使用密码解锁钱包文件。",
      agree: "我已阅读并同意INK钱包服务条款。",
      passwordNextBtn: "下一步",
      goToMainPageBtn: "回到首页",
      showAddressTitle: "您的钱包地址",
      showAddressDescr: "钱包地址用于接受转账，您可以将它告诉其他人。" +
      "记忆词和钱包文件则是您拥有钱包的凭证。" +
      "其中钱包文件用于载入web钱包，而记忆词用于在其他设备上恢复您的钱包。" +
      "您应该妥善保管它们，且不应分享给任何人。" +
      "INK也不会保存您的钱包文件或记忆词。。" +
      "如果它们丢失或被盗，您将无法找回您的钱包及其中的资产。",
      showAddressNextBtn: "我已理解地址、记忆词和钱包文件，继续创建钱包",
      showMnemonicTitle: "您的记忆词",
      showMnemonicDescr: "务必记住，钱包文件用于载入web钱包，" +
      "而记忆词用于在其他设备上恢复您的钱包。" +
      "如果您同时丢失了二者，您将无法找回您的钱包。" +
      "只要拥有钱包文件或记忆词，任何人都可以控制您的钱包。" +
      "因此，您应该仔细保存记忆词和钱包文件，避免遗失或被盗。" +
      "由于在区块链网络中，记忆词无法被其他密码再次加密，" +
      "INK推荐您将记忆词抄在纸上，而不是存储在本地或云端硬盘中。",
      showMnemonicNextBtn: "已记录，进入我的钱包",
      showMnemonicDownloadBtn: "下载我的钱包文件"
    },
    sendTransaction: {
      modalTitle: "发送",
      prepareForm: {
        token: "交易种类",
        availableAmount: "可用金额:",
        amountPlaceholder: "请输入对方地址",
        to: "发给",
        amount: "金额",
        description: "交易描述",
        fee: {
          label: "手续费",
          custom: "自定义",
          standart: "标准",
          slow: "慢",
          quick: "快"
        },
        confirmBtn: "确认",
        errors: {
          emptyAddress: "地址不能为空",
          emptyAmount: "金额不能为空",
          invalidAmount: "请输入合法的金额",
          invalidAddress: "请输入合法的地址",
          dustAmount: "The amount is too small",
          amountLow: "超过资产余额"
        }
      },
      confirmForm: {
        token: "交易种类:",
        to: "发给:",
        amount: "金额:",
        description: "交易描述:",
        fees: "手续费:",
        inputPassword: "请输入密码",
        errors: {
          passwordIsIncorrect: "密码不正确",
          passwordIsEmpty: "密码不能为空"
        },
        confirmBtn: "确认"
      },
      successForm: {
        succeed: "转账成功！",
        doneBtn: "完成"
      }
    },
    receive: {
      modalTitle: "收款",
      qrDescription: "扫描二维码收款，或者把您的钱包地址发给付款方",
      addressLabel: "您的钱包地址",
      copyBtn: "复制钱包地址"
    },
    restoreWallet: {
      title: "恢复钱包",
      inputYourMnemonics: "请输入您的记忆词",
      errors: {
        invalid: "记忆词无效",
        notEntered: "记忆词不能为空"
      },
      passwordInfo: "此密码只用于您的新钱包文件。" +
      " 您可以只使用一次，或下载钱包文件供以后使用。" +
      "您的旧钱包文件同样有效，且密码不变。",
      resetPassword: "重设钱包文件密码:",
      resetPassword2: "确认钱包文件密码:",
      restoreSuccessTitle: "恢复成功！",
      restoreInfo: {
        info1: "如果您只是一次性在这台设备上登录，请不要下载钱包文件。" +
        "这样，您的新密码也只在这次登录中有效。",
        info2: "即使您下载了新钱包文件，旧的钱包文件依然有效，且密码不变。",
        info3: "旧钱包文件使用旧密码，新钱包文件使用新密码。" +
        "为了避免混淆，您可以删除旧的钱包文件。"
      }
    }
  },
  ko: {
    header: {
      loginBtnLabel: "로그인",
      logoutBtnLabel: "로그아웃"
    },
    main: {
      createWalletBtnLabel: "새 지갑 만들기",
      restoreWalletBtnLabel: "지갑 복원",
      backToWalletBtn: "내 지갑으로 돌아가기"
    },
    requestErrorModal: {
      title: "탐색기에서 거래 데이터를 가져올 수 없습니다. 탐색기를 재설정하거나 새로고침을 해주세요.",
      resetBtn: "탐색기 재설정",
      retryBtn: "새로고침"
    },
    newTransactionsModal: {
      title: "건의 거래가 확인되었습니다.",
      okBtn: "알겠습니다."
    },
    navPanel: {
      wallet: "내 지갑",
      assetsDetails: "자산 정보",
      securityCenter: "보안 센터",
      faq: "FAQ",
      search: "검색..."
    },
    assetsDetails: {
      amountLabel: "잔액:",
      pendingLabel: "대기:",
      allTabLabel: "전부",
      sendTabLabel: "보낸",
      receivedTabLabel: "받은",
      sendLabel: "보낸",
      receivedLabel: "받은",
      fromLabel: "부터:",
      toLabel: "까지:",
      descLabel: "거래 내용:",
      myWalletLabel: "내 지갑t",
      startDatePlaceholderText: "Start Date",
      endDatePlaceholderText: "End Date"
    },
    mainPage: {
      sendBtn: "보내기",
      importMoreBtn: "더 가져오기",
      receiveBtn: "받기",
      recentTitle: "최근 거래"
    },
    confirmCloseModal: {
      mainTitle: "지갑 파일 저장과 니모닉을 확인하세요. 최악의 경우 당신의 지갑을 영영 찾지 못할 수도 있습니다.",
      secureCenterBtn1: "로그아웃 전 백업을",
      secureCenterBtn2: "해주세요.",
      logoutBtn: "로그아웃 되셨습니다.",
      exitBtn: "OK, Close",
      dontShowBox: "더 이상 이 창을 띄우지 않음."
    },
    securityCenter: {
      pageHeading: "백업에 관해 정확히 이해하신 후 서비스를 이용해주세요. 실수로 들어오신 분들은 뒤로 가기를 눌러주시기 바랍니다.",
      panelHeading: "지갑 백업",
      panelSubHeading: "지갑 비밀번호를 입력하세요.",
      displayBtn: "니모닉 보기",
      downloadBackupBtn: "지갑 파일 다운로드",
      firstDescription: "고개님의 니모닉과 지갑 파일을 백업하는 것은 백업파일 복사하거나 니모닉을 메모함과 같은 맥락입니다.",
      secondDescription: "백업된 지갑파일은 현재 고객님이 사용하고 계시는 지갑과 동일하게 사용할 수 있습니다. ",
      thirdDescription: "타인과 지갑파일을 공유하는 행동은 자금 유출의 위험이 있으며, 백업은 보안이 확실한 환경에서 진행하시길 바랍니다.",
      forthDescription: "위의 주의사항을 읽고 이해하신 후 백업을 진행하시길 바랍니다.",
      errorModal: {
        title: "비밀번호가 틀렸습니다!",
        doneBtn: "완료"
      },
      explorerContainer: {
        title: "탐색기 설정",
        desc: "Qtum 탐색기 혹은 INK 탐색기를 통해 거래정보를 확인하실 수 있습니다.",
        customRadioLabel: "사용자 정의",
        customPathInputPlaceholder: "탐색기 주소를 입력해 주세요.",
        submitBtn: "전송"
      },
      mnemonicsModal: {
        title: "나의 니모닉",
        firstDescription: "니모닉은 본인이 기억할 수 있는 범위에서 설정 하시고 설정과 동시에 메모 해두시길 권장합니다.",
        secondDescription: "컴퓨터 내에 백업을 하신다면 편리하긴 하겠지만, ",
        thirdDescription: "S하드디스크에 문제가 생길 시 영원히 지갑을 분실할 수 있다는 점 유의바랍니다."
      }
    },
    loginPage: {
      title: "로그인",
      uploadFileBtn: "지갑 파일 업로드",
      uploadFileBtnUploaded: "성공",
      inputPasswordLabel: "비밀번호를 입력하세요.",
      confirmBtn: "확인",
      restoreLink: "니모닉을 사용해 복원하기",
      errors: {
        loginError: "비밀번호가 틀렸습니다."
      },
      restoreDescLabel: "지갑 파일이 없거나 비밀번호를 잊어버리신 경우, 또 자주 사용하지 않는 장치에서 로그인하는 경우 이곳을 클릭해 주세요."
    },
    createWallet: {
      errors: {
        notMatch: "입력하신 비밀번호가 일치하지 않습니다.",
        notEntered: "비밀번호는 6자리 이상으로 설정해주세요.",
        shortPassword: "비밀번호는 6자리 이상으로 설정해주세요."
      },
      title: "새 지갑 만들기",
      setPassword: "비밀번호 설정:",
      confirmPassword: "비밀번호 확인:",
      passwordInfo1: "비밀번호는 지갑의 보안유지를 위해 설정하며 지갑 사용/거래 생성 시 비밀번호를 필요로 합니다",
      passwordInfo2: "",
      agree: "INK 지갑 이용약관에 모두 동의합니다.",
      passwordNextBtn: "다음",
      goToMainPageBtn: "홈으로",
      showAddressTitle: "내 지갑 주소",
      showAddressDescr: "지갑 주소는 고객님의 지갑 ID이며, 타인에게 알려주어 송금받을 수 있습니다." +
      "니모닉과 지갑 파일은 지갑의 열쇠 역할을 합니다. 지갑 파일은 Web 지갑 로그인에 사용되며, " +
      "니모닉은 다른 장치 사용 시 지갑의 복원에 쓰이므로 신중히 보관하시고 절대 타인과 공유하지 마십시오. " +
      " INK는 당신의 지갑 파일과 니모닉을 따로 저장하지 않으며," +
      "파일 및 힌트 분실시 지갑과 지갑 내 자산을 찾을 수 없으니 이 점 유의하시기 바랍니다.",
      showAddressNextBtn: "이미 관련 내용을 숙지하였으며, 지갑 생성을 계속 진행하겠습니다.",
      showMnemonicTitle: "나의 니모닉",
      showMnemonicDescr: "다시 한번 주의를 당부드립니다. 지갑 파일은 Web 지갑의 로그인에 사용되며" +
      "니모닉은 다른 장비에서의 지갑 복원에 사용됩니다. " +
      "만약 지갑 파일과 니모닉 모두 분실하신 경우 지갑을 찾을 수 없습니다. " +
      "반면, 지갑 파일이나 니모닉만 가지고 있으면 누구나 당신의 지갑을 장악할 수 있습니다. " +

      "그러므로, 도난 및 분실 방지를 위해 지갑파일과 니모닉의 보관과 관리에 신중하시길 바랍니다. " +
      "또, 니모닉의 경우 블록체인 네트워크 특성 상 다른 비밀번호를 덧씌워 보안강화가 불가능해, " +
      "INK는 하드디스크(클라우드 플랫폼 포함)에 저장하기보다는 종이에 직접 메모하시는 것을 추천합니다.",
      showMnemonicNextBtn: "관련 내용을 숙지하였으며, 지갑 생성을 완료합니다.",
      showMnemonicDownloadBtn: "내 지갑 파일 다운로드"
    },
    sendTransaction: {
      modalTitle: "보내기",
      prepareForm: {
        token: "토큰 종류",
        availableAmount: "사용 가능한 금액:",
        amountPlaceholder: "주소를 입력하세요.",
        to: "받을 주소",
        amount: "보낼 금액",
        description: "거래내역",
        fee: {
          label: "수수료",
          custom: "사용자 정의",
          standart: "표준",
          slow: "느리다",
          quick: "빠르다"
        },
        confirmBtn: "확인",
        errors: {
          emptyAddress: "주소는 비워둘 수 없습니다.",
          emptyAmount: "금액은 비워둘 수 없습니다.",
          invalidAmount: "존재하지 않는 금액",
          invalidAddress: "존재하지 않는 주소",
          dustAmount: "The amount is too small",
          amountLow: "잔액을 초과하였습니다."
        }
      },
      confirmForm: {
        token: "토큰 종류:",
        to: "받을 주소:",
        amount: "보낼 금액:",
        description: "거래내역:",
        fees: "수수료:",
        inputPassword: "비밀번호를 입력하세요.",
        errors: {
          passwordIsIncorrect: "비밀번호가 틀렸습니다!",
          passwordIsEmpty: "암호 비워둘 수 없습니다."
        },
        confirmBtn: "확인"
      },
      successForm: {
        succeed: "송금 완료!",
        doneBtn: "완료"
      }
    },
    receive: {
      modalTitle: "받기",
      qrDescription: "QR코드를 스캔한 뒤 수령하거나 상대방에게 지갑 주소를 보내주세요.",
      addressLabel: "내 지갑 주소",
      copyBtn: "복사 주소"
    },
    restoreWallet: {
      title: "복원",
      inputYourMnemonics: "니모닉을 입력하세요.",
      errors: {
        invalid: "니모닉 잘못 된 경우",
        notEntered: "입력 한 니모닉 없음"
      },
      passwordInfo: "This password is for your NEW wallet file only." +
      " You can just use it once or download it for later." +
      "You old wallet file is still valid and its password is NOT be changed.",
      resetPassword: "비밀번호 재설정:",
      resetPassword2: "비밀번호 확인:",
      restoreSuccessTitle: "복원이 완료되었습니다!",
      restoreInfo: {
        info1: "이 장비에서 일회성 로그인을 하는 경우 지갑 파일을 다운로드하지 마십시오. " +
        "그럴 경우 새 비밀번호는 일회 사용후 폐기됩니다.",
        info2: "새 지갑 파일을 다운로드 했더라도 기존에 사용했던 지갑 파일은 여전히 유효하며 비밀번호가 변경되지 않음을 주의해 주십시오.",
        info3: "기존 비밀번호는 기존 지갑 파일에 사용하고, 새 비밀번호는 새 지갑 파일에 사용하십시오. " +
        "혼선 방지를 위해 기존 지갑 파일을 삭제하는 것을 권장합니다."
      }
    }
  },
  ja: {
    header: {
      loginBtnLabel: "ログイン",
      logoutBtnLabel: "ログアウト"
    },
    main: {
      createWalletBtnLabel: "新しいウォレットの作成",
      restoreWalletBtnLabel: "マイ・ウォレットの修復",
      backToWalletBtn: "ウォレットに戻る"
    },
    requestErrorModal: {
      title: "エクスプローラーは取引情報を正しく戻すことができません。エクスプローラーをリセットするか、やり直して下さい。",
      resetBtn: "エクスプローラーをリセットする",
      retryBtn: "やり直す"
    },
    newTransactionsModal: {
      title: "取引が確認されました。",
      okBtn: "了解"
    },
    navPanel: {
      wallet: "マイ・ウォレット",
      assetsDetails: "資産詳細",
      securityCenter: "セキュリティ・センター",
      faq: "よくある質問",
      search: "検索..."
    },
    assetsDetails: {
      amountLabel: "余力:",
      pendingLabel: "待機中:",
      allTabLabel: "全て",
      sendTabLabel: "送付済み",
      receivedTabLabel: "受信済み",
      sendLabel: "送付済み",
      receivedLabel: "受信済み",
      fromLabel: "から:",
      toLabel: "まで:",
      descLabel: "定義:",
      myWalletLabel: "マイ・ウォレット",
      startDatePlaceholderText: "Start Date1",
      endDatePlaceholderText: "End Date1"
    },
    mainPage: {
      sendBtn: "送付",
      importMoreBtn: "更に取り込む",
      receiveBtn: "受取",
      recentTitle: "最近"
    },
    confirmCloseModal: {
      mainTitle: "ウォレット・ファイルと二モニックを適切に保存したことを確認して下さい。そうしなければ、このウォレットを永久に失うことになります。",
      secureCenterBtn1: "バックアップのためセキュリティ",
      secureCenterBtn2: "・センターに行く",
      logoutBtn: "了解の上、ログアウトする",
      exitBtn: "OK, Close",
      dontShowBox: "今後このメッセージを表示させない"
    },
    securityCenter: {
      pageHeading: "正確に理解しておらず、意図していない場合はこの部分を操作しないで下さい。",
      panelHeading: "バックアップ",
      panelSubHeading: "バックアップのためパスワードを入力",
      displayBtn: "二モニックを表示",
      downloadBackupBtn: "ウォレット・ファイルをダウンロード",
      firstDescription: "二モニックかウオレット・ファイルのバックアップをここで取得することができます。これはウオレット・ファイルをコピーし、二モニックを書き写すことと同じです。",
      secondDescription: "それぞれのバックアップは、ウォレットを修復するために利用したものと全く同じであり、資産余力を別の形で利用することができます。",
      thirdDescription: "バックアップは他人と絶対に共有しないで下さい。",
      forthDescription: "バックアップはご本人だけのものであり、問題のない機器で安全な環境でのみバックアップを行ってください。実際に手続きに入る前に内容をご理解下さい。",
      errorModal: {
        title: "パスワードが違います！",
        doneBtn: "完成"
      },
      explorerContainer: {
        title: "エクスプローラーの設定",
        desc: "エクスプローラー・アドレスを入力して下さい.QtumエクスプローラーかINKエクスプローラーを選択して取引情報を取得できます。お好みのエクスプローラーを設定することも可能です。",
        customRadioLabel: "カスタム",
        customPathInputPlaceholder: "エクスプローラー・アドレスを入力して下さい",
        submitBtn: "堤出"
      },
      mnemonicsModal: {
        title: "あなたの二モニックは",
        firstDescription: "ウォレット・ファイルと二モニックを適切に保存したことを確認して下さい。確認が行われない場合、このウォレットを永久に失うことになります。",
        secondDescription: "ここでの言葉を紙に記載の上、忘れることがない適切な場所に施錠することを強くお勧めします。",
        thirdDescription: "コンピューターにも保存して下さい。但し、ハード・ディスクが破損すると資産の全てを失うことになります。"
      }
    },
    loginPage: {
      title: "ログイン",
      uploadFileBtn: "ウォレット・ファイルをアップロードする",
      uploadFileBtnUploaded: "成功",
      inputPasswordLabel: "パスワードを入力して下さい",
      confirmBtn: "確認",
      restoreLink: "パスワードが違います",
      errors: {
        loginError: "パスワードが違います"
      },
      restoreDescLabel: "ウォレット・ファイルがない場合やパスワードを忘れた時、頻繁に利用しない機器でログインする際はここをクリック。"
    },
    createWallet: {
      errors: {
        notMatch: "パスワードが違います。",
        notEntered: "パスワードを6文字未満にすることはできません。",
        shortPassword: "パスワードを6文字未満にすることはできません。"
      },
      title: "新しいウォレットの作成",
      setPassword: "パスワード設定:",
      confirmPassword: "パスワードの確認:",
      passwordInfo1: "パスワードはウォレット・ファイルを解除するために利用されます。",
      passwordInfo2: "ログイン時と送金時にパスワードの入力が必要になります。",
      agree: "INKウォレットの利用規約を読み、同意しました",
      passwordNextBtn: "次へ",
      goToMainPageBtn: "ホームページに戻る",
      showAddressTitle: "ウォレット・アドレス",
      showAddressDescr: "ウォレット・アドレスは、あなたのウオレットを特定するためのもので、他の人に伝えることが可能です。" +
      "ご自身のための二モニックとウォレット・ファイルは、ウォレットの鍵になります。" +
      "ウォレット・ファイルはウォレットにログインするために利用し、二モニックは他" +
      "の機器でウオレットを修復するために使いますので、両方を保持する必要があります。" +
      "重要な点ですが、INKは二モニックとウオレット・ファイルを保存していません。二。" +
      "モニックとウォレット・ファイルをお忘れにならないように注意し、他人と共有しないで下さい。",
      showAddressNextBtn: "理解の上、 二モニックとウォレット・ファイルを取得します",
      showMnemonicTitle: "二モニック",
      showMnemonicDescr: "繰り返しになりますが、ウオレット・ファイルはウオレットへのログイン時に利用し、二" +
      "モニックは他の機器でウオレットを修復するために使います。" +
      "二モニックかウオレット・ファイルを他人が取得した場合、あなたのウォレットを入手できます。" +
      "二モニックをメモしておき、ウォレット・ファイルはダウンロードし、慎重かつ安全な状態で保存して下さい。" +
      "二モニックとウォレット・ファイルの両方を紛失した場合、ウォレットを再取得することはできません。" +
      "二モニックとウォレット・ファイルをお忘れにならないように注意し、他人と共有しないで下さい。",
      showMnemonicNextBtn: "理解の上、開始する",
      showMnemonicDownloadBtn: "ウォレット・ファイルをダウンロードする"
    },
    sendTransaction: {
      modalTitle: "送付",
      prepareForm: {
        token: "トークン",
        availableAmount: "利用可能金額:",
        amountPlaceholder: "アドレスを入力s",
        to: "まで",
        amount: "金額",
        description: "定義",
        fee: {
          label: "手数料",
          custom: "カスタム",
          standart: "水準",
          slow: "遅い",
          quick: "速い"
        },
        confirmBtn: "確認",
        errors: {
          emptyAddress: "アドレス部分が入力されていません。",
          emptyAmount: "金額部分が入力されていません。",
          invalidAmount: "金額無効です。",
          invalidAddress: "アドレスが無効です。",
          dustAmount: "The amount is too small",
          amountLow: "資産を超過しています"
        }
      },
      confirmForm: {
        token: "トークン:",
        to: "まで:",
        amount: "金額:",
        description: "定義:",
        fees: "手数料:",
        inputPassword: "パスワードを入力",
        errors: {
          passwordIsIncorrect: "パスワードが違います！",
          passwordIsEmpty: "パスワード部分が入力されていません！"
        },
        confirmBtn: "確認"
      },
      successForm: {
        succeed: "成功しました！",
        doneBtn: "完成"
      }
    },
    receive: {
      modalTitle: "受領",
      qrDescription: "トークンをウォレットで受け取るためQRコードをスキャン、もしくはウォレット・アドレスをコピーするかシェアします。",
      addressLabel: "ウォレット・アドレス",
      copyBtn: "コピーアドレス"
    },
    restoreWallet: {
      title: "修復",
      inputYourMnemonics: "二モニックを入力して下さい",
      errors: {
        invalid: "二モニック無効です",
        notEntered: "二モニック部分が入力されていません"
      },
      passwordInfo: "This password is for your NEW wallet file only." +
      " You can just use it once or download it for later." +
      "You old wallet file is still valid and its password is NOT be changed.",
      resetPassword: "パスワードのリセット:",
      resetPassword2: "パスワードの確認:",
      restoreSuccessTitle: "成功しました！",
      restoreInfo: {
        info1: "このウオレット・ファイルを1回限りのパスワードで利用する場合、ダウンロードはしないで下さい。ダ" +
        "ウンロードをしてしまうと、ログアウト後、パスワードが保存されなくなります。",
        info2: "古いウォレット・ファイルは現在も有効で、パスワードは変更されていません。",
        info3: "古いパスワードは古いウォレット・ファイル用で、新しいパスワードは新しいウォレット・ファイル用です。" +
        "混乱をさけるため、古いウォレット・ファイルを消去することも可能です。"
      }
    }
  }
};

export const LANG_LABELS = {
  en: "EN",
  ja: "日本語",
  zh: "中文",
  ko: "한국어"
};
