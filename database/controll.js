const axios = require('axios');
const FormData = require('form-data');

async function uploadImage(image, folder) {
    try {
        const base64 = await image.data.toString('base64');
        const fileImage = `data:${image.mimetype};base64,${base64}`;
        const form = new FormData();
        form.append('file', fileImage);
        form.append('folder', folder);
        form.append('upload_preset', 'desa-konda');
        form.append('cloud_name', 'dph249ste');
        const upload = await axios.post(
            'https://api.cloudinary.com/v1_1/dph249ste/image/upload',
            form,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                },
            },
        );
        return upload.data
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { uploadImage };
