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
import React from "react";

const CreatePost = () => {
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
            <Button>Image</Button>
            <Button>Video</Button>
            <Button>Heading 1</Button>
            <Button>Heading 2</Button>
            <Button>Heading 3</Button>
            <Button>Paragraph</Button>
          </Grid>
        </View>
        <View marginLeft={10} marginTop={10} marginRight={10}>
          <TextAreaField
            label="Enter Content:"
            name="paragraph"
            placeholder="Paragraph Content"
            rows={3}
          />
        </View>
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
