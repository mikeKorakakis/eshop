'use client'
import FormInput from "@/components/ui/FormInput";
import Input from "@/components/ui/Input";
import React, { useState, ChangeEvent } from "react";



const FileUpload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null); // File type for file state

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			e?.target?.files[0] && setFile(e?.target?.files[0]);
		}
	};

	

	const handleUpload = async (): Promise<void> => {
		if (!file) {
			alert("Please select a file.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch(`${process.env.API_URL}/api/media`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			console.log("Upload successful:", data);
			alert("File uploaded successfully.");
		} catch (error: any) {
			console.error("Error uploading file:", error.message);
			alert("Error uploading file.");
		}
	};

	return (
		<div>			
			<FormInput name="file" type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default FileUpload;