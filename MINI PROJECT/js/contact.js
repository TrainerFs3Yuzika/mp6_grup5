const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;

            const data = {
                name,
                email,
                message
            }

            localStorage.setItem('data', JSON.stringify(data));

            Swal.fire(
                'Berhasil!',
                'Pesan Terkirim!',
                'success'
            );

            contactForm.reset();
        });