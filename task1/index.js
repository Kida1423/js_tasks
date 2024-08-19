$(document).ready(function() {

    var options = {
        url: "https://restcountries.com/v2/all",
        getValue: "name",
        list: {
            match: {
                enabled: true
            }
        }
    };
    $("#country").easyAutocomplete(options);
    $("#date_text").datepicker({
        dateFormat: "yy-mm-dd"
    });

    let posts = JSON.parse(localStorage.getItem('posts')) || []
    displayPosts(posts);

    $('#save').on('click', function() {
        let message = $('#info').val();
        let date = $('#date_text').val();
        let country=$('#country').val();
        let index = $(this).data('index');
        if(message && date && country){
            let post = {
                    message: message,
                    date: date,
                    country:country
                }

                if(index!==undefined){
                    posts[index]=post
                    $('#save').text('Save').removeData('index');
                    Swal.fire('Updated', 'Пост успешно обновлен!', 'success');

                } else {
                    posts.push(post)
                    Swal.fire('Success', 'Пост успешно добавлен!', 'success');

                }
                localStorage.setItem('posts', JSON.stringify(posts));
                displayPosts(posts)
                clearForm(); 
        } else {
            Swal.fire('Error', 'Все поля обязательны для заполнения!', 'error');
        } 
   
    });
    $(document).on('click','.edit', function(){
        let index = $(this).parent().data('index');
        let post = posts[index] 
        $('#info').val(post.message);
        $('#date_text').val(post.date);
        $('#country').val(post.country); 
        $('#save').text('Update').data('index',index);
    })
    $(document).on('click', '.delete', function() {
        let index=$(this).parent().data('index');
        posts.splice(index, 1);
        localStorage.setItem('posts',JSON.stringify(posts));
        displayPosts(posts)
        Swal.fire('Удалено', 'Сообщение успешно удалено!!', 'success');
    })
    function displayPosts(posts){
        $('#posts').empty();
        posts.forEach((post, index) => {
            let postElement = $(`
                <div class="post" data-index="${index}">
                    <p><strong>Country:</strong> ${post.country}</p>
                    <p><strong>Date:</strong> ${post.date}</p>
                    <p><strong>Message:</strong> ${post.message}</p>
                    <button class="edit btn">Edit</button>
                    <button class="delete btn">Delete</button>
                </div>
            `);  
            $('#posts').append(postElement); 
        });

    }
    let clearForm=()=>{
        $('#info').val('');
        $('#date_text').val('');
        $('#country').val('');
    }
});
