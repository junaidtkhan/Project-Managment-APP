import axios from 'axios';
import useStore from '../store';


const user = useStore.getState().user;

export const UploadFile = async (file, fileName, fileType, ProjectId) => {
	try {
		// Get pre-signed URL from the backend
		const response = await axios.post('http://localhost:3000/project/upload', {
			fileName,
			fileType,
			projectId: ProjectId
		}, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const { url } = response.data;
		console.log("pre-signed URL for file", url);

		// Upload file to S3 using the pre-signed URL
		await axios.put(url, file, {
			headers: {
				'Content-Type': fileType
			}
		});

		alert('File uploaded successfully');
	} catch (err) {
		console.error('Error uploading file:', err);
		alert('Failed to upload file');
	}

}
