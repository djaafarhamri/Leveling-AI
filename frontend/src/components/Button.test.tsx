// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with correct text', () => {
    render(<Button text="Click me Now" onClick={() => {}} />);
    expect(screen.getByText('Click me Now')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click me Now" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me Now'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
