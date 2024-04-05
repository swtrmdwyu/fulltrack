import { Meta, StoryObj } from "@storybook/react";
import Button from "../Components/Button";
/**
 * Componente de botão.
 */
const meta: Meta<typeof Button> = {
    title: "DESIGN SYSTEM/Button",
    component: Button,
    tags: [ "autodocs" ],
    parameters: {
    layout: "centered",
    },
    argTypes: {
        theme: {
            control: {
                type: "inline-radio"
            }
        }
    },
    decorators: [
        (Story) => (
            <div style={{ width: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Story />
            </div>
        ),
    ]
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        theme: "primary",
        children: "Default"
    }
}