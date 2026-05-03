import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'default'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Concluído',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Falhou',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pendente',
  },
}

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Depósito',
  },
}
