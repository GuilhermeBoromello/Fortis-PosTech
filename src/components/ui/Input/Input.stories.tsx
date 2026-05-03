import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Ex: Pagamento de aluguel',
    id: 'description',
  },
}

export const WithError: Story = {
  args: {
    label: 'Valor',
    placeholder: '0,00',
    error: 'O valor deve ser maior que zero',
    id: 'amount',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Não editável',
    disabled: true,
  },
}
