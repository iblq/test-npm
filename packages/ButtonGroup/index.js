import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Popover } from "antd";
import "./style.less";

const Wrap = ({ space, children }) => {
  return <span style={{ marginLeft: space }}>{children}</span>;
};

const ButtonGroup = ({ count, space, title, children, ghost, disabled }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hideMenu = () => {
      if (visible) {
        setVisible(false);
      }
    };
    document.addEventListener("click", hideMenu, false);
    return () => {
      document.removeEventListener("click", hideMenu, false);
    };
  });

  const buttons = btns => {
    if (btns) {
      return btns.map(({ component, key }) => (
        <Wrap space={space} key={key}>
          {component}
        </Wrap>
      ));
    }
    return btns;
  };

  if (children && Array.isArray(children)) {
    const childs = children
      .map((ele, i) => ({ key: i, component: ele }))
      .filter(ele => !!ele.component);
    if (childs.length > count) {
      const visibleButtons = childs.slice(0, count - 1);
      const moreButtons = childs.slice(count - 1);
      return (
        <>
          {buttons(visibleButtons)}
          <Wrap space={space}>
            <Popover
              visible={visible}
              mouseLeaveDelay={0.15}
              placement="bottomRight"
              overlayClassName="popover-more-button"
              content={moreButtons.map(({ component, key }) => (
                <div key={key} onClick={() => setVisible(false)}>
                  {component}
                </div>
              ))}
            >
              <Button
                type="primary"
                ghost={ghost}
                disabled={disabled}
                onClick={() => setVisible(!visible)}
              >
                {title}
                <Icon type="down" />
              </Button>
            </Popover>
          </Wrap>
        </>
      );
    }
    return buttons(childs);
  }
  return children;
};

ButtonGroup.defaultProps = {
  // 展示的按钮
  count: 4,
  // 间距
  space: 12,
  // 名称
  title: "更多",
  // 按钮类型
  ghost: true,
  // 按钮置灰
  disabled: false
};

ButtonGroup.propTypes = {
  count: PropTypes.number,
  space: PropTypes.number,
  title: PropTypes.string,
  ghost: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ButtonGroup;
