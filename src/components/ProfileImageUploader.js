import React, { useState, useEffect } from 'react';

const ProfileImageUploader = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlUpload = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            setImage(url);
            localStorage.setItem('profileImage', url);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        localStorage.removeItem('profileImage');
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Profile Picture Uploader</h2>
            <div className="flex flex-col items-center">
                {image ? (
                    <div className="mb-4">
                        <img 
                            src={image} 
                            alt="Profile" 
                            className="w-48 h-48 object-cover rounded-full border-4 border-gray-300"
                        />
                        <button 
                            onClick={handleRemoveImage} 
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                        >
                            Remove Image
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 mb-4">No image uploaded</p>
                )}
            </div>
            <div className="flex flex-col items-center">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="mb-2 text-gray-700 border border-gray-300 rounded p-2"
                />
                <button 
                    onClick={handleUrlUpload} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    Upload from URL
                </button>
            </div>
        </div>
    );
};

export default ProfileImageUploader;
