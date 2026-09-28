"use client";

import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/notionists.json";

const style = new Style(definition);
const avatar = new Avatar(style, {
  size: 96,
  backgroundColor: "b6e3f4",
});

export function ProfileAvatar() {
  return (
    <div
      className="inline-block rounded-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: avatar.toString() }}
    />
  );
}
