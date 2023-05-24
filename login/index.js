const form  = document.getElementById('signup');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nickname = form.elements['nickname'].value;
    const body = {nickname: nickname};

    fetch("http://192.168.100.10:3000/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            redirectURL = data.redirectTo;
            alert('Redirecionando para a interface de chat...');
            setTimeout(() => {
                window.location.replace(redirectURL);
            }, 1000);
        })
});