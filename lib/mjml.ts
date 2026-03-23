import mjml2html from 'mjml-browser';

export const convertMjmlToHtml = (mjml: string) => {
  try {
    const { html, errors } = mjml2html(mjml, {
      beautify: true,
      minify: false,
    });
    return { html, errors };
  } catch (e) {
    return { html: '', errors: [e] };
  }
};