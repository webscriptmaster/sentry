import {Fragment} from 'react';

import {initializeOrg} from 'sentry-test/initializeOrg';
import {fireEvent, mountWithTheme, screen} from 'sentry-test/reactTestingLibrary';

import GlobalModal from 'app/components/globalModal';
import FiltersAndSampling from 'app/views/settings/project/filtersAndSampling';

export const commonConditionCategories = [
  'Release',
  'Environment',
  'User Id',
  'User Segment',
  'Browser Extensions',
  'Localhost',
  'Legacy Browser',
  'Web Crawlers',
  'IP Address',
  'Content Security Policy',
  'Error Message',
  'Transaction',
];

export function renderComponent(withModal = true) {
  const {organization, project} = initializeOrg({
    organization: {features: ['filters-and-sampling']},
  } as Parameters<typeof initializeOrg>[0]);

  return mountWithTheme(
    <Fragment>
      {withModal && <GlobalModal />}
      <FiltersAndSampling organization={organization} project={project} />
    </Fragment>
  );
}

export async function renderModal(actionElement: HTMLElement, takeScreenshot = false) {
  // Open Modal
  fireEvent.click(actionElement);
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toBeInTheDocument();

  if (takeScreenshot) {
    expect(dialog).toSnapshot();
  }
}
