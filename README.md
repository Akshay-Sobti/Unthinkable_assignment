Hey!!

So, the project which I have made is **'Visual Product Matcher'**. In this project, the main idea was to build a web application that helps users find visually similar products based on uploaded images.
First of all, the main thing was to built the logic of how to upload the files, be it PDF OR JPG/ JPEG/ PNG, etc. So, for this I created useState hook and set it to 'false' to check or to track if the file is uploaded or not. Then, I used formData() constructor and then used the method 'append' to append the files whichever the uses selects from its system and to handle any errors, I had used the try - catch block beneath the formData() constructor to check if there is an error, if yes, then catch it and display the particular error which in this case was: 'File upload failed'. 
For Image URL part, I created two useState() hooks and which were const [fileUrl, setFileUrl] = useState(""); - > this one was for to store the File URL and the second one was const [url, setUrl] = useState(""); -> this one was for URL input.

The users also has the option to **view the image**. So, for this I again used the useState() hook which I had created and gave it the name fileUpload. Then, I used the <a > tag in which I had given the localhost URL like this: href={`http://localhost:3001${fileUrl}`}, "fileUrl" means the corrected file URL which is accessed or to be accessed in public/images folder. I had created this folder to store the images.

For storing data, I had used the **MongoDB Compass** database in which all our records is being stored.

**Basic commands to start the frontend and backend are:-**

**-> For Frontend:** Go to the 'client' or 'Frontend' folder or whatever name you have to given to that folder. Now, go to the terminal and write the command, **cd client or cd frontend** ('cd' is the command and then your folder name). Now, you will be inside your frontend folder. Now write **npm run dev**. This will give you the localhost link. Click on it and now you will be able to see your working or the main page of your project on the screen. 

**-> For Backend:** Now, again come back to the terminal and type **cd..** (with the help of this you can again come back to the main directory or the main folder of the project). Now, write **cd server** (here, server is the name of your backend folder, you can give whatever name you want, in my case I had given this name). After writing this command, you will go to your backend or the server folder. Now, write **npm start**. This command starts your backend or the server or the database. If you are getting this line in the terminal: **Server is running!**, then that means your backend code is working fine with no errors but if you are not getting this line in the terminal, then their might be some error which you have to rectify.

So, after doing all this, you can check the working of your project by simply interacting with the frontend i.e. the main page of your project and after clicking on the 'Submit' button, if your record is being displayed in the terminal of visual studio code or whatever software you have used, then that means your codes are working fine. Also, you can go to the database which you have used and refresh it to check whether the data was properly uploaded in the database or not.

So, this was my project. THANK YOU!!
