import PageLayout from "@/components/layouts/page";
import UploadFile from "@/components/upload";
import {
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

const client = generateClient<Schema>();

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
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<{ [key: string]: boolean }>(
    initialTypeState
  );
  const [content, setContent] = useState<{ [key: string]: string }>(
    initialContentState
  );
  const [elements, setElements] = useState<{ [key: string]: string }[]>([]);

  const setContentType = (key: string) => {
    setType({ ...type, [key]: !type[key] });
  };

  const addContent = (key: string) => {
    const keyContent = content[key];
    if (!keyContent) {
      return;
    }

    setElements([...elements, { key, value: keyContent }]);
    setContent({ ...content, [key]: "" });
    key !== "paragraph" && setContentType(key);
  };

  const createNews = () => {
    if (!title) {
      return;
    }

    client.models.News.create({
      title,
      content: elements,
    });

    // console.log({
    //   title,
    //   content: elements,
    // });
  };

  const shiftUp = (index: number) => {
    const item = elements[index];
    const newIndex = index === 0 ? elements.length - 1 : index - 1;
    const oldItem = elements[newIndex];
    elements[newIndex] = item;
    elements[index] = oldItem;

    console.log({ elements });

    // setElements(elements);
  };

  const shiftDown = (index: number) => {
    console.log({ index });
  };

  const removeItem = (index: number) => {
    setElements(elements.filter((_: any, i: number) => i !== index));
  };

  return (
    <PageLayout title="Create News">
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
              <UploadFile acceptedFileTypes={["image/png", "image/jpeg"]} />
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
                <View fontSize={"2rem"}>{title}</View>
                {elements.map(({ key, value }, index) => (
                  <Flex
                    key={index}
                    direction={"row"}
                    gap={"small"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <View>
                      {key} {value}
                    </View>
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
        <View marginLeft={10} marginTop={20} marginRight={10}>
          <Flex justifyContent={"flex-end"}>
            <Button>Cancel</Button>
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
