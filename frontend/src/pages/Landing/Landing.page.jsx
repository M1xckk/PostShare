import { Container } from "@mantine/core";

const Landing = () => {
  return (
    <Container>
      <h1>Welcome to PhotosShare</h1>
      <p>
        PhotosShare is a platform where photographers can upload, edit, and
        share their photos along with detailed descriptions. Join our community
        to explore inspiring images, connect with other photographers, and
        showcase your work with your name proudly displayed. You can revisit
        your uploads anytime to refine descriptions or update photos, making it
        easy to keep your gallery fresh and engaging.
      </p>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px", // Space between images
        justifyContent: "center",
      }}>
        <img
          src="https://cdn.pixabay.com/photo/2020/09/19/21/15/lake-5585558_1280.jpg"
          alt="Nice Mountains"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
        <img
          src="https://cdn.pixabay.com/photo/2021/02/21/17/59/snow-6037324_640.jpg"
          alt="Snow mountains"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
        <img
          src="https://cdn.pixabay.com/photo/2021/09/20/21/32/lake-6641880_1280.jpg"
          alt="Lake rocks"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
        <img
          src="https://cdn.pixabay.com/photo/2022/12/10/11/05/snow-7646952_640.jpg"
          alt="Snow trees"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
        <img
          src="https://cdn.pixabay.com/photo/2023/09/28/23/18/snake-8282641_640.jpg"
          alt="Snake reptile"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
        <img
          src="https://cdn.pixabay.com/photo/2024/05/08/17/45/animal-8748794_640.jpg"
          alt="Lion mammal"
          style={{ width: "calc(50% - 20px)", height: "auto" }}
        />
      </div>
    </Container>
  );
};

export default Landing;
