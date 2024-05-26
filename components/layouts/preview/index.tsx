import { Text, View } from "@aws-amplify/ui-react";

const NewsContent = (props: { type: string; content: string }) => {
  const { type, content } = props;

  switch (type) {
    case "image":
      return content;

    case "video":
      return content;

    case "h1":
      return (
        <View>
          <Text variation="secondary" fontSize={"4rem"}>
            {content}
          </Text>
        </View>
      );

    case "h2":
      return (
        <View>
          <Text variation="secondary" fontSize={"3rem"}>
            {content}
          </Text>
        </View>
      );

    case "h3":
      return (
        <View>
          <Text variation="secondary" fontSize={"2rem"}>
            {content}
          </Text>
        </View>
      );

    case "paragraph":
      return (
        <View>
          <Text variation="secondary" fontSize={"1rem"}>
            {content}
          </Text>
        </View>
      );

    default:
      return null;
  }
};

export default NewsContent;
