const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

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

// eslint-disable-next-line camelcase
const deleteImage = async (public_id) => {
    try {
        const timestamp = new Date().getTime()
        const clodinarySecret = process.env.CLOUDINARY_API_SECRET;
        const cloudinaryKey = process.env.CLOUDINARY_API_KEY;
        // eslint-disable-next-line camelcase
        const string = `public_id=${public_id}&timestamp=${timestamp}${clodinarySecret}`;
        // eslint-disable-next-line global-require
        const signature = require('crypto').createHash('sha1').update(string).digest('hex')
        const formData = new FormData()
        formData.append('public_id', public_id)
        formData.append('signature', signature)
        formData.append('api_key', cloudinaryKey)
        formData.append('timestamp', timestamp)
        const del = await axios.post(
            'https://api.cloudinary.com/v1_1/dph249ste/image/destroy',
            formData,
        )
        return del.data
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { uploadImage, deleteImage };
