let btn = document.querySelector('#btn');
let div = document.querySelector('#app');
let promise = function(){
    return new Promise(function(resolve, reject){

        let github_user = document.querySelector('input[name=github_user]').value;

        let ajax = new XMLHttpRequest();
        ajax.open('GET', `https://api.github.com/users/${github_user}`);
        ajax.send(null);

        ajax.onreadystatechange = function(){
            if(ajax.readyState === 4){
                if(ajax.status === 200){
                    resolve(JSON.parse(ajax.responseText));
                }else{
                    reject('Não foi encontrado nenhum usuário com este nome.')
                }
            }
        }
    });
}
btn.onclick = function(){
    //Limpar a div
    div.innerHTML = '';

    //Criar o span
    let spanNome = document.createElement('span');

    //Criar a variavel nome
    let txtNome = '';
    //Executando a Promise
    promise()
    //resolve (Sucesso)
    .then(function(Response){
        //Se o usuário tem nome
        if(Response['name'] !== null){
            txtNome = document.createTextNode(Response['name']);

            let img = document.createElement('img');
            img.setAttribute('src', Response['avatar_url']);
            img.setAttribute('alt', Response['name']);
            img.setAttribute('width', '75px');
            img.setAttribute('height', ' 75px');

            div.appendChild(img);
        }else{
            txtNome = document.createTextNode('O usuário encontrado não possui nome.');
        }
        //Adiciona o texto ao span e o span a div
        spanNome.appendChild(txtNome);
        div.appendChild(spanNome);
    })
    .catch(function(erro){
        txtNome = document.createTextNode(erro);

            //Adiciona o texto ao span e o span a div)
            spanNome.appendChild(txtNome);
        div.appendChild(spanNome);
    })

}