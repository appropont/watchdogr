import Component from 'react-pure-render/component';
import React from 'react';
import { FormattedHTMLMessage, defineMessages } from 'react-intl';

// Messages collocation ftw.
// https://github.com/yahoo/react-intl/wiki/API#definemessages
const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'A fanciful endeavor by <a href="http://appropont.com">Appropont</a>',
    id: 'footer.madeByHtml'
  }
});

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          <FormattedHTMLMessage {...messages.madeByHtml} />
        </p>
      </footer>
    );
  }

}
