# Contributing

Thank you for contributing to ChatButtonsBegone! Your help improves the plugin for everyone. This document combines contribution guidelines and the project style guide into a single reference for proposing changes, formatting code, and submitting pull requests.

## Reporting Issues
When opening an issue, prefix the title with a descriptive tag in brackets (for example, [Bug], [Enhancement]):
- **Bug**: Include clear steps to reproduce, expected vs. actual behavior, and any relevant console errors or screenshots.
- **Enhancement**: Describe the requested feature along with your proposed solution.
    - Features that prevent core client functionality(for example, removing the User Settings button) are not permitted.

## Developing

### Getting Started
To contribute to ChatButtonsBegone:
1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your changes (use a descriptive name).
4. Make your changes following the style guide.
5. Test your changes thoroughly before submitting a PR.
    - Test both enabled and disabled states of any new settings, and ensure that it does not affect other parts of the client.
    - Verify your changes don't break existing functionality by testing related features.

### Style Guide

#### JavaScript Standards
- **Strings**: Use single quotes. Use backticks for template literals that perform interpolation.
- **Semicolons**: Always include semicolons at the end of statements.
- **Indentation**: Use 4 spaces per indentation level.
- **Trailing commas**: Use trailing commas in multiline objects and arrays.

#### CSS Selector Standards
- **Prefer attribute selectors**: Use attribute selectors instead of class selectors where possible.
- **Avoid aria- and id attributes**: When creating a selector, avoid using aria- and id attributes.
- **Quoting**: Any attribute selector matching a specific value must use double quotes.
    - Example: `[class*="inset"]`

#### ChatButtonsBegone Settings Standards
- **Default state**: All settings should be disabled by default, except for Nitro-related buttons and features.
- **Setting IDs**:
    - Use camelCase.
    - Include the name of the target.
    - Suffix with Button when the setting corresponds to a button.

#### Versioning
Pull requests should not increment the project version unless a maintainer explicitly requests it.

## Questions or Need Help?
If you have questions about contributing or need clarification on guidelines, feel free to open an issue. We're here to help!