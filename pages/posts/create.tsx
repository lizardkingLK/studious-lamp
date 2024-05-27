import PageLayout from "@/components/layouts/page";
import UploadFile from "@/components/upload";
import {
  Alert,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Label,
  TextAreaField,
  View,
} from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import NewsContent from "@/components/layouts/preview";
import { useRouter } from "next/router";
import { uploadData } from "aws-amplify/storage";

const client = generateClient<Schema>();

enum alertTypes {
  success = "success",
  error = "error",
  warning = "warning",
}

type alertType = {
  type: alertTypes;
  heading: string;
};

const initialTypeState = {
  image: false,
  video: false,
  h1: false,
  h2: false,
  h3: false,
  paragraph: true,
};

const initialContentState = {
  image: "",
  video: "",
  h1: "",
  h2: "",
  h3: "",
  paragraph: "",
};

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<{ [key: string]: boolean }>(
    initialTypeState
  );
  const [content, setContent] = useState<{ [key: string]: string }>(
    initialContentState
  );
  const [elements, setElements] = useState<{ [key: string]: string }[]>([]);
  const [alert, setAlert] = useState<alertType | null>();
  const [images, setImages] = useState<never[] | File[]>([]);

  const setContentType = (key: string) => {
    setType({ ...type, [key]: !type[key] });
  };

  const addContent = (key: string) => {
    if (!title) {
      toggleAlert({
        heading: "Please enter title to preview!",
        type: alertTypes.warning,
      });
    }

    const keyContent = content[key];
    if (!keyContent) {
      return;
    }

    setElements([...elements, { key, value: keyContent }]);
    setContent({ ...content, [key]: "" });
    key !== "paragraph" && setContentType(key);
  };

  const createNews = async () => {
    if (!title) {
      toggleAlert({
        heading: "Please enter good content!",
        type: alertTypes.error,
      });
      return;
    }

    const createNewsResponse = await client.models.News.create({
      title,
      content: JSON.stringify(elements),
    });

    const errors = createNewsResponse?.errors;
    if (errors) {
      toggleAlert({
        heading: errors.map((error) => error.message).join("\n"),
        type: alertTypes.error,
      });
      return;
    }

    setElements([]);
    setContent(initialContentState);
    setType(initialTypeState);
    toggleAlert({
      heading: "News Created Successfully!",
      type: alertTypes.success,
    });
  };

  const shiftUp = (index: number) => {
    const items = Object.create(elements),
      item = items[index],
      newIndex = index === 0 ? items.length - 1 : index - 1,
      oldItem = items[newIndex];
    items[newIndex] = item;
    items[index] = oldItem;
    setElements(items);
  };

  const shiftDown = (index: number) => {
    const items = Object.create(elements),
      item = items[index],
      newIndex = index === items.length - 1 ? 0 : index + 1,
      oldItem = items[newIndex];
    items[newIndex] = item;
    items[index] = oldItem;
    setElements(items);
  };

  const removeItem = (index: number) => {
    setElements(elements.filter((_: any, i: number) => i !== index));
  };

  const toggleAlert = (type: alertType) => {
    setAlert(type);
  };

  const uploadFile = async (file: File) => {
    const uploadResult = uploadData({
      data: file,
      path: `news-files/${file.name}`,
    });
    console.log({ uploadResult });
  };

  return (
    <PageLayout title="Create News">
      {alert && (
        <Alert
          isDismissible={true}
          variation={alert.type}
          onDismiss={() => setAlert(null)}
        >
          {alert.heading}
        </Alert>
      )}
      <View marginLeft={10} marginTop={10}>
        <Heading level={3} color={"black"}>
          Create News
        </Heading>
      </View>
      <View marginLeft={10} marginTop={10}>
        Enter News Content Below
      </View>
      <View marginTop={20}>
        <View marginLeft={10} marginTop={10} marginRight={10}>
          <Flex direction="column" gap="small">
            <Label htmlFor="title">Title:</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Title"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Flex>
        </View>
        <View marginLeft={10} marginTop={10} marginRight={10}>
          <Grid
            templateColumns={{
              base: "1fr 1fr 1fr",
              large: "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
            templateRows={{
              base: "repeat(2, 3rem)",
              large: "repeat(1, 6rem)",
            }}
            gap={10}
          >
            <Button
              onClick={() => setContentType("image")}
              borderWidth={type.image ? ".5rem" : ".01rem"}
            >
              Image
            </Button>
            <Button
              onClick={() => setContentType("video")}
              borderWidth={type.video ? ".5rem" : ".01rem"}
            >
              Video
            </Button>
            <Button
              onClick={() => setContentType("h1")}
              borderWidth={type.h1 ? ".5rem" : ".01rem"}
            >
              Heading 1
            </Button>
            <Button
              onClick={() => setContentType("h2")}
              borderWidth={type.h2 ? ".5rem" : ".01rem"}
            >
              Heading 2
            </Button>
            <Button
              onClick={() => setContentType("h3")}
              borderWidth={type.h3 ? ".5rem" : ".01rem"}
            >
              Heading 3
            </Button>
            <Button onClick={() => setType(initialTypeState)}>Paragraph</Button>
          </Grid>
        </View>
        {type.image && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="image" fontSize={"1rem"}>
                Upload Image:
              </Label>
              <UploadFile
                acceptedFileTypes={["image/png", "image/jpeg"]}
                files={images}
                setFiles={setImages}
                uploadFile={uploadFile}
              />
              <Flex direction="row" gap="small">
                <Input
                  id="image"
                  name="image"
                  placeholder="Enter Image"
                  fontSize={"1rem"}
                  required={false}
                  value={content.image}
                  onChange={(e) =>
                    setContent({ ...content, image: e.target.value })
                  }
                />
                <Button onClick={() => addContent("image")}>ADD</Button>
              </Flex>
            </Flex>
          </View>
        )}
        {type.video && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="video" fontSize={"1rem"}>
                Upload Video:
              </Label>
              <Flex direction="row" gap="small">
                <Input
                  id="video"
                  name="video"
                  placeholder="Enter Video"
                  fontSize={"1rem"}
                  required={false}
                  value={content.video}
                  onChange={(e) =>
                    setContent({ ...content, video: e.target.value })
                  }
                />
                <Button onClick={() => addContent("video")}>ADD</Button>
              </Flex>
            </Flex>
          </View>
        )}
        {type.h1 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading1" fontSize={"4rem"}>
                Heading 1:
              </Label>
              <Flex direction="row" gap="small">
                <Input
                  id="heading1"
                  name="heading1"
                  placeholder="Enter Heading 1"
                  fontSize={"4rem"}
                  required={false}
                  value={content.h1}
                  onChange={(e) =>
                    setContent({ ...content, h1: e.target.value })
                  }
                />
                <Button onClick={() => addContent("h1")}>ADD</Button>
              </Flex>
            </Flex>
          </View>
        )}
        {type.h2 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading2" fontSize={"3rem"}>
                Heading 2:
              </Label>
              <Flex direction="row" gap="small">
                <Input
                  id="heading2"
                  name="heading2"
                  placeholder="Enter Heading 2"
                  fontSize={"3rem"}
                  required={false}
                  value={content.h2}
                  onChange={(e) =>
                    setContent({ ...content, h2: e.target.value })
                  }
                />
                <Button onClick={() => addContent("h2")}>ADD</Button>
              </Flex>
            </Flex>
          </View>
        )}
        {type.h3 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading3" fontSize={"2rem"}>
                Heading 3:
              </Label>
              <Flex direction="row" gap="small">
                <Input
                  id="heading3"
                  name="heading3"
                  placeholder="Enter Heading 3"
                  fontSize={"2rem"}
                  required={false}
                  value={content.h3}
                  onChange={(e) =>
                    setContent({ ...content, h3: e.target.value })
                  }
                />
                <Button onClick={() => addContent("h3")}>ADD</Button>
              </Flex>
            </Flex>
          </View>
        )}
        {type.paragraph && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="paragraph" fontSize={"1rem"}>
                Enter Content:
              </Label>
              <TextAreaField
                label={null}
                name="paragraph"
                placeholder="Paragraph Content"
                rows={3}
                value={content.paragraph}
                onChange={(e) =>
                  setContent({ ...content, paragraph: e.target.value })
                }
              />
              <Button onClick={() => addContent("paragraph")}>ADD</Button>
            </Flex>
          </View>
        )}
        {title && elements.length > 0 && (
          <View marginLeft={10} marginTop={10}>
            <Heading
              level={5}
              color={"font.secondary"}
              marginTop={20}
              marginBottom={10}
            >
              Preview
            </Heading>
            <View
              border={"dashed"}
              borderWidth={".125rem"}
              borderColor={"border.primary"}
              marginRight={10}
            >
              <Flex direction={"column"} padding={10}>
                <View fontSize={"2rem"}>
                  <Heading level={1} fontWeight={800}>
                    {title}
                  </Heading>
                </View>
                {elements.map(({ key, value }, index) => (
                  <Flex
                    key={index}
                    direction={"row"}
                    gap={"small"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <NewsContent type={key} content={value} />
                    <Flex gap={"small"}>
                      <Button padding={0} onClick={() => shiftUp(index)}>
                        🔼
                      </Button>
                      <Button padding={0} onClick={() => shiftDown(index)}>
                        🔽
                      </Button>
                      <Button padding={0} onClick={() => removeItem(index)}>
                        ❎
                      </Button>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </View>
          </View>
        )}
        <View margin={10}>
          <Flex justifyContent={"flex-end"}>
            <Button onClick={() => router.push("/")}>Cancel</Button>
            <Button
              backgroundColor={"background.tertiary"}
              color={"font.tertiary"}
            >
              Save Draft
            </Button>
            <Button
              backgroundColor={"background.secondary"}
              color={"font.tertiary"}
              onClick={createNews}
            >
              Publish
            </Button>
          </Flex>
        </View>
      </View>
    </PageLayout>
  );
};

export default CreatePost;
