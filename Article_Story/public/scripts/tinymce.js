window.onload= function() {
    tinymce.init({
        selector: 'textarea#tiny-mce-post-body',
        plugins: ["a11ychecker advcode advlist lists link checklist autolink autosave code",'preview','searchreplace','wordcount','media table emoticons img imagetools'],
        toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
        height: 300,
        automatic_uploads: true,
        images_uploads_url: '/uploads/postimage'
    })
}