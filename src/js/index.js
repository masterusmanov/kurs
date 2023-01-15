let yourname = document.querySelector('#yourname');
let title = document.querySelector('#title');
let sms = document.querySelector('#sms');
let rasm = document.querySelector('#rasm');
let dog = document.querySelector('.dog');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { yourname, title, sms, rasm} = event.target;
    fetch('http://localhost:2007/create_course', {
        method: "POST",
        body: JSON.stringify({
            yourname: yourname.value,
            title: title.value,
            sms: sms.value,
            rasm: rasm.value
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
});

// ============================================================================== //
function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:2007/get_courses', {
    method: "POST"
}).then(res => res.json())
    .then(courses => {
        for (let course of courses) {
            let [div1, img, h2, h3, p2, i, i2] = createElement('div', 'img', 'h2', 'h3', 'p', 'i', 'i');
            div1.className = 'card';
            div1.style.width = '250px'
            div1.style.border = '1px solid black';
            div1.style.borderRadius = '15px';
            div1.style.backgroundColor = 'gray';
            div1.style.position = 'relative';
            div1.style.margin = '10px';

            h2.style.textAlign = 'center';
            h2.style.padding = '15px';
            h3.style.textAlign = 'center';
            p2.style.textAlign = 'center';
            
            img.className = 'img';
            img.src = course.rasm;
            img.style.width = '100%';
            img.style.height = '150px';
            img.style.borderRadius = '15px';
            h2.textContent = course.title;
            h3.textContent = course.yourname;
            p2.textContent = course.sms;

            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.style.color = 'red';
            i.style.marginLeft = '20px';
            i.style.padding = '10px';
            i.addEventListener('click', () => {
                fetch(`http://localhost:2007/delete_course/${course.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });
            i2.className += 'fa fa-edit text-primary ml-3';
            i2.setAttribute("data-target", "#myModal");
            i2.setAttribute("data-toggle", "modal");
            i2.style.cursor = 'pointer';
            i2.style.float = 'right';
            i2.style.marginRight = '20px';
            i2.style.color = 'blue';
            i2.style.padding = '10px';

            i2.addEventListener('click', () => {
                rasm.value = course.rasm
                title.value = course.title
                yourname.value = course.yourname
                sms.value = course.sms
                localStorage.setItem('courseId', course.id)
            });

            div1.append(img, h2, h3, p2, i, i2);
            dog.append(div1);

        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { title, url, thumbnailUrl } = event.target;
            fetch(`http://localhost:1987/update_course/${localStorage.getItem('courseId')}`, {
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    url: url.value,
                    thumbnailUrl: thumbnailUrl.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });



    // ============================================================================= //
    