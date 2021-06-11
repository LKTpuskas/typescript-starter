import { render } from '@testing-library/react';
import { ComponentLoader } from './ComponentLoader';
describe('ComponentLoader test', () => {
  it('should render the loader spinning when the loading is true', () => {
    const { container, queryByText } = render(
      <ComponentLoader isLoading>
        <div>test</div>
      </ComponentLoader>
    );
    expect(container.querySelector('.component-loader')).not.toBeNull();
    // expect(container.querySelector('.osu-spinner')).not.toBeNull();
    expect(queryByText('Loading')).not.toBeNull();
    expect(queryByText('test')).not.toBeNull();
    // rerender(<ComponentLoader isLoading loadingText="Waiting..." />);
    // expect(queryByText('Loading...')).toBeNull();
    // expect(queryByText('Waiting...')).not.toBeNull();
  });
  it('should only display the children when the isLoading is false', () => {
    const { container } = render(
      <ComponentLoader>
        <div>test</div>
      </ComponentLoader>
    );
    expect(container.firstChild?.textContent).toBe('test');
  });
});