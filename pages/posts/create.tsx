import PageLayout from "@/components/layouts/page";
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

const initialTypeState = {
  image: false,
  video: false,
  h1: false,
  h2: false,
  h3: false,
  paragraph: true,
};

const CreatePost = () => {
  const [type, setType] = useState<{ [key: string]: boolean }>(
    initialTypeState
  );

  const setContentType = (key: string) => {
    setType({ ...type, [key]: !type[key] });
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
              <Input
                id="image"
                name="image"
                placeholder="Enter Image"
                fontSize={"1rem"}
                required={false}
              />
            </Flex>
          </View>
        )}
        {type.video && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="video" fontSize={"1rem"}>
                Upload Video:
              </Label>
              <Input
                id="video"
                name="video"
                placeholder="Enter Video"
                fontSize={"1rem"}
                required={false}
              />
            </Flex>
          </View>
        )}
        {type.h1 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading1" fontSize={"4rem"}>
                Heading 1:
              </Label>
              <Input
                id="heading1"
                name="heading1"
                placeholder="Enter Heading 1"
                fontSize={"4rem"}
                required={false}
              />
            </Flex>
          </View>
        )}
        {type.h2 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading2" fontSize={"3rem"}>
                Heading 2:
              </Label>
              <Input
                id="heading2"
                name="heading2"
                placeholder="Enter Heading 2"
                fontSize={"3rem"}
                required={false}
              />
            </Flex>
          </View>
        )}
        {type.h3 && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <Flex direction="column" gap="small">
              <Label htmlFor="heading3" fontSize={"2rem"}>
                Heading 3:
              </Label>
              <Input
                id="heading3"
                name="heading3"
                placeholder="Enter Heading 3"
                fontSize={"2rem"}
                required={false}
              />
            </Flex>
          </View>
        )}
        {type.paragraph && (
          <View marginLeft={10} marginTop={10} marginRight={10}>
            <TextAreaField
              label="Enter Content:"
              name="paragraph"
              placeholder="Paragraph Content"
              rows={3}
            />
          </View>
        )}
        <View marginLeft={10} marginTop={10} marginRight={10}>
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
