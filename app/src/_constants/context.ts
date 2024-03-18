// todo: replace test data with actual empty config handling

const defaultMode = {
  default: {
    id: 'default',
    power: true,
    blocked: false,
    titles: {
      default: {
        header: 'main page header',
        footer: 'main page footer'
      },
      login: {
        header: '### blackshell login',
      }
    },
    users: {
      jensen: {
        name: 'Adam Jensen',
        hackable: false,
        hacked: false,
        root: true,
        password: '1K0q_#sz'
      },
      flatline: {
        name: 'Johnny Flatline',
        hackable: true,
        hacked: false,
        root: false,
        password: 'dixi3fl4t',
        menu: {}
      },
      boon: {
        name: 'Toshiro Boon',
        hackable: true,
        hacked: false,
        root: true,
        password: 'letmein'
      }
    },
    menu: [
      {
        text: 'menu row one',
        type: 'text',
        content: 'this is text 1'
      },
      {
        text: 'menu row two',
        type: 'text',
        content: 'this is text 2'
      },
      {
        text: 'menu row three',
        type: 'text',
        content: 'this is text 3'
      }
    ]
  }
}

export default defaultMode;
