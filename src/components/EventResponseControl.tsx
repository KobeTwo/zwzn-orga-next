import { SegmentedControl, Center } from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconQuestionMark,
} from '@tabler/icons-react';
import React, { useState } from 'react';

interface EventControlResponseProps {
    eventId: string;
  }

export function EventResponseControl(props: EventControlResponseProps) {

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [color, setColor] = useState('gray');
  const handleSegmentChange = (value) => {
    console.log(`Selected value: ${value} for event ID: ${props.eventId}`);
    setSelectedValue(value);
    if (value === 'yes') {
        setColor('green');
    } else if (value === 'no') {
        setColor('red');
    } else if (value === 'maybe'){
        setColor('gray');
    }
  };
  return (
    <SegmentedControl
                data={[
                  { label:(
                      <Center>
                        <IconThumbUp size="1rem" />
                      </Center>
                    ), 
                    value: 'yes' 
                  },
                  { label:(
                      <Center>
                        <IconQuestionMark size="1rem" />
                      </Center>
                    ), 
                    value: 'maybe' },
                  { label:(
                      <Center>
                        <IconThumbDown size="1rem" />
                      </Center>
                    ), 
                    value: 'no' },
                ]}
                value={selectedValue}
                color={color}
                onChange={handleSegmentChange}
              />
  );
}