export const formatImage = (path: string) => {
  return `${process.env.NEXT_PUBLIC_MINIO_URL}/shop/` + path;
};

export const uploadFile = async (file: File): Promise<number | null> => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append('name', file.name);
  formData.append('file', file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    if (data.media_id) {
      return data.media_id;
    }
    return null;
  } catch (error: any) {
    console.error('Error uploading file:', error.message);
    alert('Error uploading file.');
    return null;
  }
};

export function formatPrice(value = 0, currency: string = 'EUR') {
	return new Intl.NumberFormat('el-GR', {
	  style: 'currency',
	  currency
	}).format(value);
  }

  export function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}
