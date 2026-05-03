import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Excluir',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancelar',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Pequeno',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Grande',
  },
}
