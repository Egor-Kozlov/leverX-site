function isLogin(params) {
    //get container 
    const loginContainer = document.querySelector('.header__account-container')
    let userInfo
    let userImg
    //clear container
    while (loginContainer.firstChild) {
      loginContainer.removeChild(loginContainer.firstChild);
    }

    if (localStorage.getItem('userPhoto') && localStorage.getItem('userName')) {
      //get template
      const loginUserTemplate = document.querySelector('#logged-user')
      //pick img
      userImg = loginUserTemplate.content.querySelector('.header__avatar')
      userImg.setAttribute('src', `${localStorage.getItem('userPhoto')}`)
      userInfo = loginUserTemplate.content.cloneNode(true)
    } else {
      //get template
      const unLoginUserTemplate = document.querySelector('#non-logged-user')
      userInfo = unLoginUserTemplate.content.cloneNode(true)
    }
    console.log(localStorage.getItem('userPhoto'));
    console.log(localStorage.getItem('userName'));
    loginContainer.append(userInfo)
  }
  
  isLogin()

  function logOut(params) {
    console.log('да');
    localStorage.clear()
    LogoutUser()
    isLogin()
  }
        document.getElementById('user-info').style.display = "none"

        document.getElementById('login__button').addEventListener('click', GoogleLogin)
        document.getElementById('logout').addEventListener('click', LogoutUser)

        let provider = new firebase.auth.GoogleAuthProvider()

        function GoogleLogin() {
            console.log('login__button Btn Call')
            firebase.auth().signInWithPopup(provider).then(res => {

                document.location.href = './index.html'
//
                console.log(res.user)
                document.getElementById('login').style.display = "none"
                document.getElementById('user-info').style.display = "block"
                showUserDetails(res.user)
            }).catch(e => {
                console.log(e)
            })
        }

        function showUserDetails(user) {
            document.getElementById('userDetails').innerHTML = `
          <img src="${user.photoURL}" style="width:10%">
          <p>Name: ${user.displayName}</p>
          <p>Email: ${user.email}</p>
        `
            localStorage.setItem('userPhoto', `${user.photoURL}`)
            localStorage.setItem('userName', `${user.displayName}`)
            // console.log(localStorage.getItem('userPhoto'));
            // console.log(localStorage.getItem('userName'));
        }

        function checkAuthState() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    document.getElementById('login').style.display = "none"
                    document.getElementById('user-info').style.display = "block"
                    showUserDetails(user)
                } else {

                }
            })
        }

        function LogoutUser() {
            console.log('Logout Btn Call')
            firebase.auth().signOut().then(() => {
                document.getElementById('login').style.display = "block"
                document.getElementById('user-info').style.display = "none"

            }).catch(e => {
                console.log(e)
            })
        }
        checkAuthState()