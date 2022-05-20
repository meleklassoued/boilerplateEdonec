import { render } from "@testing-library/react";

import RawFilePicker from "../RawFilePicker";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RawFilePicker
        mediaUploadToken={null}
        name="Test name"
        label="test label"
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
